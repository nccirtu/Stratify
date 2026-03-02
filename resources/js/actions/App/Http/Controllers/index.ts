import DashboardController from './DashboardController'
import BusinessPlanController from './BusinessPlanController'
import Settings from './Settings'

const Controllers = {
    DashboardController: Object.assign(DashboardController, DashboardController),
    BusinessPlanController: Object.assign(BusinessPlanController, BusinessPlanController),
    Settings: Object.assign(Settings, Settings),
}

export default Controllers