import { LightningElement, track } from 'lwc';
import { loadScript } from 'lightning/platformResourceLoader';
import getMonthlyInventoryData from '@salesforce/apex/InventoryChartController.getMonthlyInventoryData'; // Changed Apex method and class name
import chartJs from '@salesforce/resourceUrl/chart'; // Core Chart.js library
import resizeObserverPolyfill from '@salesforce/resourceUrl/resizeObserverPolyfill'; // ResizeObserver Polyfill
import chartJsDataLabels from '@salesforce/resourceUrl/ChartDataLabels2'; // DataLabels plugin

export default class InventoryChartComponent extends LightningElement {
    @track inventoryData = []; // Renamed from stockData to inventoryData
    chart; // Chart.js instance
    isChartJsInitialized = false; // Prevent loading Chart.js multiple times

    renderedCallback() {
        if (this.isChartJsInitialized) {
            return;
        }
        this.isChartJsInitialized = true;

        // Load Chart.js, DataLabels plugin, and ResizeObserver Polyfill
        Promise.all([
            loadScript(this, resizeObserverPolyfill),
            loadScript(this, chartJs),
            loadScript(this, chartJsDataLabels)
        ])
            .then(() => {
                // Fetch the live data from Apex once Chart.js is loaded
                this.fetchInventoryData(); // Renamed from fetchStockOutData to fetchInventoryData
            })
            .catch(error => {
                console.log('Error loading Chart.js or DataLabels plugin', error);
            });
    }

    fetchInventoryData() { // Fetch data from the Apex method
        getMonthlyInventoryData() // New Apex method name
            .then((result) => {
                this.inventoryData = result; // Store the fetched data
                this.initializeChart(); // Initialize the chart with live data
            })
            .catch(error => {
                console.log('Error fetching inventory data', error);
            });
    }

    initializeChart() {
        const canvas = this.template.querySelector('canvas[data-id="chart"]');
        if (!canvas) {
            console.error('Canvas element not found');
            return;
        }

        const ctx = canvas.getContext('2d');
        if (!ctx) {
            console.error('Failed to get canvas context');
            return;
        }

        if (this.chart) {
            this.chart.destroy(); // Destroy previous chart instance
        }

        // Prepare chart data using data fetched from Apex
        const labels = this.inventoryData.map(data => data.monthYear);
        const stockInData = this.inventoryData.map(data => data.stockInQuantity);
        const stockOutData = this.inventoryData.map(data => data.stockOutQuantity);
        const turnoverData = this.inventoryData.map(data => Math.min(data.turnover, 100)); // Cap turnover at 100%
        const stockInCostData = this.inventoryData.map(data => data.stockInCost); // Renamed variable for stock in cost
        const stockOutCostData = this.inventoryData.map(data => data.stockOutCost); // Renamed variable for stock out cost

        this.chart = new window.Chart(ctx, {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [
                    {
                        label: 'Stock In Quantity',
                        data: stockInData,
                        backgroundColor: '#2ecc71', // Green for Stock In
                        order: 2,
                    },
                    {
                        label: 'Stock Out Quantity',
                        data: stockOutData,
                        backgroundColor: '#e74c3c', // Red for Stock Out
                        order: 3,
                    },
                    {
                        label: 'Turnover (%)',
                        data: turnoverData,
                        type: 'line',
                        borderColor: '#3498db',
                        fill: false,
                        yAxisID: 'y-axis-turnover',
                        order: 1,
                    }
                ]
            },
            options: {
                responsive: true,
                plugins: {
                    title: {
                        display: true,
                        text: 'Monthly Inventory Data and Turnover in Percentage',
                        color: 'white', // White title to contrast with dark background
                        font: {
                            weight: 'bold',
                            size: 20
                        }
                    },
                    datalabels: {
                        color: 'black',
                        font: {
                            weight: 'light',
                            size: 18
                        },
                        formatter: function (value, context) {
                            if (value === 0) return null;

                            if (context.dataset.label === 'Stock In Quantity') {
                                return '$' + stockInCostData[context.dataIndex].toLocaleString(); // Format stock in cost
                            } else if (context.dataset.label === 'Stock Out Quantity') {
                                return '$' + stockOutCostData[context.dataIndex].toLocaleString(); // Format stock out cost
                            } else if (context.dataset.label === 'Turnover (%)') {
                                return value + '%'; // Return percentage for turnover
                            }

                            return '$' + value.toLocaleString(); // Default for other values
                        },
                    },
                    tooltip: {
                        callbacks: {
                            label: function (tooltipItem) {
                                if (tooltipItem.dataset.label === 'Turnover (%)') {
                                    return 'Turnover: ' + tooltipItem.raw + '%';
                                } else if (tooltipItem.dataset.label === 'Stock In Quantity') {
                                    const cost = stockInCostData[tooltipItem.dataIndex];
                                    return 'Stock In: ' + tooltipItem.raw + ', Cost: $' + cost.toLocaleString();
                                } else if (tooltipItem.dataset.label === 'Stock Out Quantity') {
                                    const cost = stockOutCostData[tooltipItem.dataIndex];
                                    return 'Stock Out: ' + tooltipItem.raw + ', Cost: $' + cost.toLocaleString();
                                }
                                return `${tooltipItem.dataset.label}: ${tooltipItem.raw}`;
                            }
                        }
                    }
                },
                scales: {
                    x: {
                        title: {
                            display: true,
                            text: 'Months',
                        },
                        ticks: {
                            color: '#000',
                        },
                        grid: {
                            display: false,
                        }
                    },
                    y: {
                        title: {
                            display: true,
                            text: 'Quantity',
                        },
                        ticks: {
                            color: '#000',
                            beginAtZero: true,
                        },
                        grid: {
                            color: 'rgba(0, 0, 0, 0.1)',
                        }
                    },
                    'y-axis-turnover': {
                        position: 'right',
                        beginAtZero: true,
                        ticks: {
                            callback: function (value) {
                                return value + '%'; // Format turnover as percentage
                            }
                        }
                    }
                }
            },
            plugins: [window.ChartDataLabels]
        });
    }
}
