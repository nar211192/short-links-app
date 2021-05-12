import React from "react"
import { 
    Switch, 
    Route, 
    Redirect 
} from 'react-router-dom'
import {LinksPage} from './pages/LinksPage'
import {AuthPage} from './pages/AuthPage'
import {CreatePage} from './pages/CreatePage'
import {DetailPage} from './pages/DetailPage'

export const useRoutes = isAuthenticated => {
    if (isAuthenticated) {
        return (
            <div>
                <Switch>
                    <Route path="/links" exact>
                        <LinksPage />
                    </Route>
                    <Route path="/create" exact>
                        <CreatePage />
                    </Route>
                    <Route path="/detail/:id" exact>
                        <DetailPage />
                    </Route>
                    <Redirect to="/create"/>
                </Switch>
            </div>
        )
    }

    return(
        <div>
            <Switch>
                <Route path="/" exact>
                    <AuthPage />
                </Route>
            </Switch>
        </div>
    ) 
}