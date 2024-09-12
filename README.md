# Chart.js with Salesforce LWC

This guide explains how to use **Chart.js** in **Salesforce Lightning Web Components (LWC)** to visualize data fetched from Salesforce via **Apex**.

## Setup Instructions

### 1. Upload Static Resources

1. **Chart.js**:
   - Go to **Setup** > **Static Resources**.
   - Click **New**, upload the `chart.js` file, and name it `chartJs`.

2. **Chart.js DataLabels Plugin**:
   - Upload `chartjs-plugin-datalabels.js` as a static resource and name it `ChartDataLabels2`.

3. **ResizeObserver Polyfill**:
   - Upload `ResizeObserver.global.js` as a static resource and name it `ResizeObserverPolyfill`.

### 2. Deploy the Apex Class

1. Open **Developer Console** or **VS Code** with Salesforce extensions.
2. Deploy the `InventoryChartController.cls` to your Salesforce org.
   - This Apex class fetches data for the chart.

### 3. Create and Deploy the LWC Component

1. Create a new LWC component named `inventoryChartComponent`.
2. Replace the generated component files with:
   - `chartJs.html` (template)
   - `chartJs.js` (logic)
   - Optionally, `chartJs.css` (styling the chart).

### 4. Add the LWC Component to a Lightning Page

1. Navigate to **App Builder** in your Salesforce org.
2. Open or create a new Lightning page.
3. Drag and drop the **inventoryChartComponent** onto the page.
4. Save and activate the page.

### 5. Customize the Chart (Optional)

- Modify the **Apex class** if you need to fetch different data.
- You can customize the chart's appearance (e.g., labels, tooltips, axes) by editing `chartJs.js`.

## Troubleshooting

- **Chart Not Displaying**: Ensure all static resources (Chart.js, DataLabels, ResizeObserver) are uploaded and named correctly.
- **No Data Appearing**: Make sure the Apex class is returning valid data.

---

Once set up, the component will display charts using **Chart.js** based on data fetched from Salesforce objects.
