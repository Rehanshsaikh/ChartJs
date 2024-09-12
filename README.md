# Inventory Chart LWC Project

This project demonstrates how to integrate **Chart.js** with **Salesforce Lightning Web Components (LWC)** to visualize data fetched from Salesforce via **Apex**.

## Setup Instructions

### 1. Upload Static Resources

1. **Chart.js**:
   - Go to **Setup** > **Static Resources**.
   - Click **New**, upload the `chart.js` file from your local folder, and name it `chartJs`.

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
2. Replace the generated component files with the following:
   - `chartJs.html` (for the template)
   - `chartJs.js` (for the logic)
   - Optionally, `chartJs.css` (for styling the chart).

### 4. Add the LWC Component to a Lightning Page

1. Navigate to **App Builder** in your Salesforce org.
2. Open or create a new Lightning page.
3. Drag and drop the **inventoryChartComponent** onto the page.
4. Save and activate the page.

### 5. Customize the Chart (Optional)

- Modify the **Apex class** if you need to pull data from different Salesforce objects or fields.
- You can customize the chart's appearance (e.g., labels, tooltips, axis configuration) by editing `chartJs.js`.

## Troubleshooting

- **Chart Not Displaying**: Verify that all static resources (Chart.js, DataLabels, ResizeObserver) are uploaded and named correctly.
- **No Data Appearing**: Ensure that the Apex class is returning valid data from Salesforce.

---

Once set up, the component will display dynamic charts using **Chart.js** based on data fetched from Salesforce objects.
