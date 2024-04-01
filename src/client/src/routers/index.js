import { Auth } from "@/pages/Auth/Auth";
import { Register } from "@/pages/Register/Register";
import { Home } from "@/pages/Home/Home";
import { Profiles } from "@/pages/Profiles/Profiles";
import { UpgradePlan } from "@/pages/UpgradePlan/UpgradePlan";
import { Account } from "@/pages/Account/Account";
import { Missing } from "@/pages/Missing/Missing";
import { CheckOut } from "@/pages/CheckOut/CheckOut";

import { TVShow } from "@/pages/TVShow/TVShow";
import { Movies } from "@/pages/Movies/Movies";
import { Cart } from "@/pages/Cart/Cart";
import { Browse } from "@/pages/Browse/Browse";
import { Favorite } from "@/pages/Favorite/Favorite";
import { Search } from "@/pages/Search/Search";

import { NavLayout, FullyNavLayout } from "@/pages/NavLayout";

import AdminLayout from "@/pages/AdminLayout";
import Dashboard from "@/pages/Admin/DashBoard";
import DataTable from "@/pages/Admin/DataTable";
import MovieUpload from "@/pages/Admin/MovieUpload";
import Customer from "@/pages/Admin/Customer";
import Plan from "@/pages/Admin/Plan";
import Watch from "@/pages/Watch/Watch";
import PaymentConfirm from "../pages/PaymentConfirm/PaymentConfirm";
import PaymentSuccess from "../pages/PaymentConfirm/PaymentSuccess";
import AvatarPage from "../pages/Avatar/AvatarPage";
import ReviewPage from "../pages/ReviewPage/ReviewPage";
//Public routes payment_success
const viewerRoutes = [
    { path: "/register", component: Register },
    { path: "/login", component: Auth },
    { path: "/UpgradePlan", component: UpgradePlan },
    { path: "/checkout/:p_id", component: PaymentConfirm, layout: null },
    { path: "/profiles", component: Profiles },
    { path: "/YourAccount", component: Account },
    { path: "/changeAvatar", component: AvatarPage },
    { path: "/allReview/:id/:name", component: ReviewPage },

    { path: "/", component: Home, layout: null },
    { path: "/tvshow", component: TVShow, layout: FullyNavLayout },
    { path: "/cart", component: Cart },
    { path: "/payment_success", component: PaymentSuccess, layout: null },
    { path: "/movies", component: Movies, layout: FullyNavLayout },
    { path: "/browse", component: Browse, layout: FullyNavLayout },
    { path: "/favorite", component: Favorite, layout: FullyNavLayout },
    { path: "/search", component: Search, layout: FullyNavLayout },
    { path: "/watch/:id/:name", component: Watch, layout: null },
    { path: "*", component: Missing },
];

// Private Route
const adminRoutes = [
    { path: "/", component: Dashboard, layout: AdminLayout },
    { path: "/admin", component: Dashboard, layout: AdminLayout },
    { path: "/admin/movie/", component: DataTable, layout: AdminLayout },
    {
        path: "/admin/movie/upload",
        component: MovieUpload,
        layout: AdminLayout,
    },

    { path: "/admin/customer", component: Customer, layout: AdminLayout },
    { path: "/admin/plan", component: Plan, layout: AdminLayout },
    { path: "/register", component: Register },
    { path: "/login", component: Auth, layout: NavLayout },
    { path: "*", component: Missing },
];

export { viewerRoutes, adminRoutes };
//~
