import { useState } from "react";
import { Link } from "next/link";

const listItems = [
    // {
    //     title: "Home",
    //     icon: "home"
    // },
    {
        title: "Media",
        icon: "media"
    },
    // {
    //     title: "About",
    //     icon: "about"
    // },
    {
        title: "Category",
        icon: "category"
    },

]
const Sidebar = ({ setTab, tab }) => {

    return (
        <>
            {/* <div className="d-flex flex-column flex-shrink-0 bg-body-tertiary dashboard-sidebar">
                <a href="#" className="d-block p-3 link-body-emphasis text-decoration-none" title="Icon-only" data-bs-toggle="tooltip" data-bs-placement="right">
                    <img className="" src="images/icons/logo.svg" width="24" height="24" />
                    <span className="visually-hidden">Icon-only</span>
                </a>
                <ul className="nav nav-pills nav-flush flex-column mb-auto text-center">
                    {listItems.map(({ title, icon }, index) => {
                        return (
                            <li className="nav-item">
                                <a onClick={() => setTab(title)} className={`nav-link py-3 border-bottom rounded-0 ${tab === title && "active"}`} aria-current="page" title={title} data-bs-toggle="tooltip" data-bs-placement="right">
                                    <img src={`./images/icons/${icon}.svg`} width="24" height="24" role="img" aria-label={title} />
                                </a>
                            </li>
                        )
                    })}
                </ul>


                <div className="dropdown border-top">
                    <a href="#" className="d-flex align-items-center justify-content-center p-3 link-body-emphasis text-decoration-none dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                        <img src="" alt="mdo" width="24" height="24" className="rounded-circle" />
                    </a>
                    <ul className="dropdown-menu text-small shadow">
                        <li><a className="dropdown-item" href="#">New project...</a></li>
                        <li><a className="dropdown-item" href="#">Settings</a></li>
                        <li><a className="dropdown-item" href="#">Profile</a></li>
                        <li><hr className="dropdown-divider" /></li>
                        <li><a className="dropdown-item" href="#">Sign out</a></li>
                    </ul>
                </div>
            </div> */}



            <ul className="nav nav-pills nav-fill">

                {listItems.map(({ title, icon }, index) => {
                    return (
                        <li key={index} className="nav-item">
                            <a onClick={() => setTab(title)} className={`nav-link  ${tab === title && "active"}`} aria-current="page" href="#">
                                <div className="d-flex align-items-center">
                                    <img src={`./images/icons/${icon}.svg`} width="12" height="12" role="img" aria-label={title} />
                                    <p className="text-dark ms-2 my-0">{title}</p>
                                </div>
                            </a>
                        </li>
                    )
                })}
            </ul>
        </>
    )
}

export default Sidebar;