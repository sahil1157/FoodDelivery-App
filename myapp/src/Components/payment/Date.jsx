import React, { useState, useRef } from 'react';
import DatePicker from 'react-datepicker';
import { BsClockFill } from 'react-icons/bs';
import { PiWarningCircleThin } from 'react-icons/pi';
import 'react-datepicker/dist/react-datepicker.css';

const DateComponent = () => {
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [isOpen, setIsOpen] = useState(false);
    const [clickCount, setClickCount] = useState(0); 
    const dateRef = useRef(null);

    const handleDateChange = (date) => {
        setSelectedDate(date);
    };

    const toggleDatePicker = () => {
        setClickCount((prevCount) => prevCount + 1); 
        setIsOpen((prevIsOpen) => !prevIsOpen); 
    };

    const handleInputChange = () => {
        setIsOpen(true);
    };

    const handleClose = () => {
        setIsOpen(false);
        setClickCount(0); 
    };

    return (
        <div className='md:max-w-[650px] mx-auto items-center border-2 rounded-xl h-full mt-5 w-full justify-center p-3 sm:p-6'>
            <div className='flex w-full -mt-1 flex-col gap-3'>
                <div className='flex w-full items-center flex-row gap-2'>
                    <p className='text-xl text-black font-Ubuntu'>Preference Time</p>
                    <PiWarningCircleThin size={25} />
                </div>
                <div
                    ref={dateRef}
                    className='flex flex-row items-center justify-center w-full border-[1px] rounded-xl cursor-pointer'
                    onClick={toggleDatePicker}
                >
                    <div className='relative flex items-center flex-grow'>
                        <DatePicker
                            selected={selectedDate}
                            onChange={handleDateChange}
                            showTimeSelect
                            timeFormat="HH:mm"
                            timeIntervals={15}
                            timeCaption="Time"
                            dateFormat="MMMM d, yyyy h:mm aa"
                            minDate={new Date()}
                            open={isOpen && clickCount === 1}
                            onClickOutside={handleClose}
                            customInput={
                                <input
                                    readOnly
                                    className='p-1 sm:p-4 text-md sm:text-lg font-ubuntu text-gray-700 bg-white border-gray-300 rounded-xl focus:outline-none w-full text-center'
                                    onClick={handleInputChange}
                                    value={selectedDate ? selectedDate.toLocaleString() : ''}
                                />
                            }
                            popperPlacement="bottom-end"
                            popperModifiers={{
                                flip: {
                                    enabled: false,
                                },
                                preventOverflow: {
                                    enabled: true,
                                    escapeWithReference: false,
                                    boundariesElement: 'viewport',
                                },
                            }}
                            calendarContainer={(props) => {
                                const { className, style, children } = props;
                                return (
                                    <div
                                        className={`z-50 flex items-center justify-center ${className}`}
                                        style={{
                                            ...style,
                                            width: '100%',
                                            maxWidth: '500px', 
                                            margin: 'auto',
                                        }}
                                    >
                                        {children}
                                    </div>
                                );
                            }}
                            className="w-full"
                        />
                    </div>
                    <div className='ml-2 hidden px-4 sm:block'>
                        <BsClockFill className='text-red-500 w-6 h-6' />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DateComponent;
