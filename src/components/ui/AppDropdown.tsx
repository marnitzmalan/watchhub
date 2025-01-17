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

const AppDropdown: React.FC<SelectDropdownProps> = ({
    label,
    options,
    value,
    onChange,
    placeholder = "Select an option",
}) => {
    const selectedOption = options.find((option) => option.id === value);

    return (
        <Listbox value={value} onChange={onChange}>
            <Listbox.Label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                {label}
            </Listbox.Label>
            <div className="relative mt-1">
                <Listbox.Button className="input-default flex items-center justify-between">
                    <span
                        className={`block truncate ${!selectedOption ? "text-gray-500 dark:text-gray-400" : ""}`}
                    >
                        {selectedOption?.name || placeholder}
                    </span>
                    <MdOutlineKeyboardArrowDown
                        className="w-5 h-5 text-gray-400"
                        aria-hidden="true"
                    />
                </Listbox.Button>
                <Transition
                    as={Fragment}
                    leave="transition ease-in duration-100"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <Listbox.Options className="absolute z-10 w-full py-1 mt-1 overflow-auto text-base bg-white dark:bg-gray-700 rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                        {options.map((option) => (
                            <Listbox.Option
                                key={option.id}
                                className={({ active }) =>
                                    `${
                                        active
                                            ? "text-purple-900 bg-purple-100 dark:text-purple-100 dark:bg-purple-900"
                                            : "text-gray-900 dark:text-gray-100"
                                    }
                                    cursor-default select-none relative py-2 pl-10 pr-4`
                                }
                                value={option.id}
                            >
                                {({ selected, active }) => (
                                    <>
                                        <span
                                            className={`${
                                                selected ? "font-medium" : "font-normal"
                                            } block truncate`}
                                        >
                                            {option.name}
                                        </span>
                                        {selected ? (
                                            <span
                                                className={`${
                                                    active ? "text-purple-600" : "text-purple-600"
                                                }
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

export default AppDropdown;
