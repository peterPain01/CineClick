import { Auth } from "@/pages/Auth/Auth";
import { Register } from "@/pages/Register/Register";
import { Home } from "@/pages/Home/Home";
import { Profiles } from "@/pages/Profiles/Profiles";
import { Payment } from "@/pages/Payment/Payment";
import { Account } from "@/pages/Account/Account";
import { Missing } from "@/pages/Missing/Missing";
import { CheckOut } from "@/pages/CheckOut/CheckOut";

import { TVShow } from "@/pages/TVShow/TVShow";
import { Movies } from "@/pages/Movies/Movies";
import { Cart } from "@/pages/Cart/Cart";
import { Browse } from "@/pages/Browse/Browse";
import { Admin } from "@/pages/Admin/Admin";

import { NavLayout, FullyNavLayout } from "@/pages/NavLayout";

//Public routes
const publicRoutes = [
    { path: "/register", component: Register },
    { path: "/login", component: Auth },
    { path: "/payment", component: Payment },
    { path: "/checkout", component: CheckOut },
    { path: "/topup", component: Cart },
    { path: "/profiles", component: Profiles },
    { path: "/YourAccount", component: Account },

    { path: "/", component: Home, layout: FullyNavLayout },
    { path: "/tvshow", component: TVShow, layout: FullyNavLayout },
    { path: "/movies", component: Movies, layout: FullyNavLayout },
    { path: "/browse", component: Browse, layout: FullyNavLayout },
    { path: "*", component: Missing },
    { path: "/admin", component: Admin },
];

// Private Route
const privateRoutes = [];

export { publicRoutes, privateRoutes };

//~
