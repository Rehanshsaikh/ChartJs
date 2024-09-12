# Inventory Chart LWC Project

This project demonstrates how to integrate **Chart.js** with **Salesforce Lightning Web Components (LWC)** to display data using charts. It fetches data from Salesforce using **Apex** and visualizes it as bar and line charts.

## Quick Setup

### 1. Upload Static Resources

Go to **Setup** > **Static Resources**, then upload the following files:

1. **Chart.js**:
   - Upload the `chart.js` file and name it `chartJs`.

2. **Chart.js DataLabels Plugin**:
   - Upload the `chartjs-plugin-datalabels.js` file and name it `ChartDataLabels2`.

3. **ResizeObserver Polyfill**:
   - Upload `ResizeObserver.global.js` as `ResizeObserverPolyfill`.

### 2. Deploy the Apex Class

Deploy the `InventoryChartController.cls` to your Salesforce org using **Developer Console** or **VS Code**. This class fetches data to be displayed in the chart.

```apex
public with sharing class InventoryChartController {
    @AuraEnabled(cacheable=true)
    public static List<MonthlyData> getMonthlyData() {
        // Fetch data from Salesforce objects or create dummy data
        List<MonthlyData> data = new List<MonthlyData>();
        data.add(new MonthlyData('Jan', 100, 80, 75, 5000, 4000));
        return data;
    }
}

