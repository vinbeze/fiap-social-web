import { BrowserRouter, Route, Switch } from "react-router-dom";
import Feed from "./pages/Feed";
import NewPost from "./pages/NewPost";
import UploadImageProfile from "./pages/UploadImageProfile";

function Router() {


    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/">
                    <Feed />
                </Route>
                <Route path="/new-post">
                    <NewPost />
                </Route>
                <Route path="/upload-profile">
                    <UploadImageProfile/>
                </Route>
            </Switch>
        </BrowserRouter>
    );
}

export default Router;