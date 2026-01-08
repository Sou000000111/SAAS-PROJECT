import TrafficPieChart from "../charts/TrafficPieChart";
import Insights from "../widgets/Insights";
import RecentActivity from "../widgets/RecentActivity";
import VisitorInsights from "./VisitorInsights";
import CustomerSatisfaction from "./CustomerSatisfaction";
import TargetVsReality from "./TargetVsReality";
import TopProducts from "./TopProducts";
import SalesByCountry from "./SalesByCountry";
import VolumeVsService from "./VolumeVsService";


export default function SecondaryWidgets() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <TrafficPieChart />
      <Insights />
      <RecentActivity />
      <VisitorInsights />
      <CustomerSatisfaction />
      <TargetVsReality />
      <TopProducts />
      <SalesByCountry />
      <VolumeVsService />
    </div>
  );
}
