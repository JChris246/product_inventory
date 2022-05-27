const TextInput = ({ label, value, update, name, placeholder, full }) => {
    return (
        <div className={"flex items-center justify-between my-2 " + (full ? " w-full" : "")}>
            <label htmlFor={name} className={"text-lg text-gray-200 capitalize" + (full ? " w-full" : "")}>
                {label}</label>
            <input type="text" placeholder={placeholder} value={value} onChange={update} name={name}
                className="border-none px-2 py-1 rounded-sm w-2/3 sm:w-4/5 outline-none
                    placeholder:text-stone-400 text-neutral-100 bg-neutral-600 focus:outline-green-400"/>
        </div>
    );
};

export default TextInput;