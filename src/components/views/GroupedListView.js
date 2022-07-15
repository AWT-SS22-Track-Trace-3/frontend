import React from "react";
import { Dropdown, DropdownButton, Pagination } from "react-bootstrap";
import CustomPagination from "./CustomPagination";

const selectedStyle = {
    backgroundColor: "rgba(0, 0, 0, 0.03)",
    color: "#00ACC1"
}

const GroupedListView = ({ buttons, title, selectHandler, children, paginationHandler, paginationConfig }) => {
    return (
        <div className="d-flex flex-column" style={{ height: "100%" }}>
            <div className="d-flex align-items-center justify-content-between mb-4">
                <h5 className="m-0">{title}</h5>
                <div className="d-flex">
                    {Object.keys(buttons).filter((x) => x != "pagination").map((key) => (
                        <DropdownButton key={key} title={buttons[key].title} className="ms-2">
                            {buttons[key].items.map((item, i) => {
                                return (
                                    <Dropdown.Item
                                        key={i}
                                        value={item.value}
                                        style={item.selected ? selectedStyle : {}}
                                        onClick={() => selectHandler(key, item.value)}
                                    >
                                        {item.title}
                                    </Dropdown.Item>
                                )
                            })}
                        </DropdownButton>
                    ))}
                </div>
            </div>
            <div style={{ flexGrow: 1 }} className="mb-4">
                {children}
            </div>
            <div className="d-flex justify-content-center">
                <CustomPagination
                    paginationHandler={paginationHandler}
                    totalItems={paginationConfig.total}
                    intervalSize={paginationConfig.interval}
                    current={paginationConfig.current}
                ></CustomPagination>
            </div>
        </div>
    );
}

export default GroupedListView;