public with sharing class InventoryChartController {
    @AuraEnabled(cacheable=true)
    public static List<MonthlyInventoryData> getMonthlyInventoryData() {
        List<MonthlyInventoryData> inventoryData = new List<MonthlyInventoryData>();

        // Example data - Replace with actual query logic
        inventoryData.add(new MonthlyInventoryData('Jan', 100, 80, 75, 5000, 4000));
        inventoryData.add(new MonthlyInventoryData('Feb', 120, 100, 85, 6000, 5000));
        inventoryData.add(new MonthlyInventoryData('Mar', 130, 90, 95, 6500, 4500));
        inventoryData.add(new MonthlyInventoryData('Apr', 150, 110, 98, 7500, 5500));
        inventoryData.add(new MonthlyInventoryData('May', 170, 130, 92, 8500, 6500));
        inventoryData.add(new MonthlyInventoryData('Jun', 180, 140, 88, 9000, 7000));

        return inventoryData;
    }

    public class MonthlyInventoryData {
        @AuraEnabled public String monthYear;
        @AuraEnabled public Integer stockInQuantity;
        @AuraEnabled public Integer stockOutQuantity;
        @AuraEnabled public Decimal turnover;
        @AuraEnabled public Decimal stockInCost;
        @AuraEnabled public Decimal stockOutCost;

        public MonthlyInventoryData(String monthYear, Integer stockInQuantity, Integer stockOutQuantity, Decimal turnover, Decimal stockInCost, Decimal stockOutCost) {
            this.monthYear = monthYear;
            this.stockInQuantity = stockInQuantity;
            this.stockOutQuantity = stockOutQuantity;
            this.turnover = turnover;
            this.stockInCost = stockInCost;
            this.stockOutCost = stockOutCost;
        }
    }
}
