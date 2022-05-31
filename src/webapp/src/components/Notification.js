import React, { useContext, useEffect, useState } from "react";

const style = [
    { icon: require("../assets/icons/Check").default, css: "bg-green-500 border-green-700" },
    { icon: require("../assets/icons/Warning").default, css: "bg-yellow-500 border-yellow-700" },
    { icon: require("../assets/icons/Info").default, css: "bg-sky-600 border-sky-800" },
    { icon: require("../assets/icons/Exclamation").default, css: "bg-red-500 border-red-700" }
];

const NotificationType = { Success: 0, Warning: 1, Info: 2, Error: 3 };

const NotificationContext = React.createContext();
const useNotificationContext = () => useContext(NotificationContext);

const NotificationProvider = ({ children }) => {
    const [notificationDialog, setNotificationDialog] = useState({});
    const defaultArgs = { open: false, message: "", type: NotificationType.Info, duration: 3500, cb: null };

    const display = args => setNotificationDialog({ ...defaultArgs, ...args, open: true });
    const close = () => setNotificationDialog({ ...defaultArgs, open: false });

    return (
        <NotificationContext.Provider value={{ display, close, notificationDialog }}>
            { children }
        </NotificationContext.Provider>
    );
};

const Notification = () => {
    const { notificationDialog: { open, message, type, duration, cb }, close: handleClose } = useNotificationContext();

    const close = () =>  {
        if (cb)
            cb();
        handleClose();
    };

    useEffect(() => {
        if (open) {
            const timeout = setTimeout(close, duration);
            return () => clearTimeout(timeout);
        }
    }, [open]);

    return (
        open ? <div className={"flex space-x-4 absolute bottom-5 left-4 rounded-md p-4 text-gray-100 border-l-[5px] "
            + style[type].css + " mr-4 z-20 ease-in"} id="notification">
            {  style[type].icon({ className: "fill-gray-200 h-5" }) }
            <span>{message}</span>
        </div> : <></>
    )
};

export { Notification, NotificationType, useNotificationContext, NotificationProvider };