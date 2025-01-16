import React, { Fragment } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { MdCheck, MdOutlineKeyboardArrowDown } from "react-icons/md";

export interface Option {
    id: string;
    name: string;
}

interface SelectDropdownProps {
    label: string;
    options: Option[];
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
}

const SelectDropdown: React.FC<SelectDropdownProps> = ({
    label,
    options,
    value,
    onChange,
    placeholder = "Select an option",
}) => {
    return (
        <Listbox value={value} onChange={onChange}>
            <Listbox.Label className="block text-sm font-medium text-gray-700 mb-2">
                {label}
            </Listbox.Label>
            <div className="relative mt-1">
                <Listbox.Button className="relative w-full py-2 pl-3 pr-10 text-left bg-white rounded-lg border border-gray-300 cursor-default focus:outline-none focus-visible:ring-2 focus-visible:ring-opacity-75 focus-visible:ring-purple-500 focus-visible:border-purple-500 sm:text-sm">
                    <span className="block truncate">
                        {options.find((option) => option.id === value)?.name || placeholder}
                    </span>
                    <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                        <MdOutlineKeyboardArrowDown
                            className="w-5 h-5 text-gray-400"
                            aria-hidden="true"
                        />
                    </span>
                </Listbox.Button>
                <Transition
                    as={Fragment}
                    leave="transition ease-in duration-100"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <Listbox.Options className="absolute w-full py-1 mt-1 overflow-auto text-base bg-white rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                        {options.map((option) => (
                            <Listbox.Option
                                key={option.id}
                                className={({ active }) =>
                                    `${active ? "text-purple-900 bg-purple-100" : "text-gray-900"}
                                    cursor-default select-none relative py-2 pl-10 pr-4`
                                }
                                value={option.id}
                            >
                                {({ selected, active }) => (
                                    <>
                                        <span
                                            className={`${selected ? "font-medium" : "font-normal"} block truncate`}
                                        >
                                            {option.name}
                                        </span>
                                        {selected ? (
                                            <span
                                                className={`${active ? "text-purple-600" : "text-purple-600"}
                                                absolute inset-y-0 left-0 flex items-center pl-3`}
                                            >
                                                <MdCheck className="w-5 h-5" aria-hidden="true" />
                                            </span>
                                        ) : null}
                                    </>
                                )}
                            </Listbox.Option>
                        ))}
                    </Listbox.Options>
                </Transition>
            </div>
        </Listbox>
    );
};

export default SelectDropdown;
