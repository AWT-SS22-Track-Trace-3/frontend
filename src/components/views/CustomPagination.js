import React, { useState } from "react";
import { Pagination } from "react-bootstrap";

const CustomPagination = ({ paginationHandler, totalItems, intervalSize, current }) => {
    const getStartIndex = (number, interval) => {
        return Math.floor(number / interval) * interval;
    }

    const getPageArray = (size, startIndex) => {
        return Array.from(Array(size), (_, i) => startIndex + i);
    }

    return (
        <Pagination>
            <Pagination.First onClick={() => paginationHandler(0)} disabled={current == 0} />
            <Pagination.Prev onClick={() => paginationHandler(current - 1)} disabled={current == 0} />

            {getPageArray(intervalSize, getStartIndex(current, intervalSize)).map((index) => (
                <Pagination.Item disabled={index + 1 > totalItems} active={current === index} key={index} onClick={() => paginationHandler(index)}>{index + 1}</Pagination.Item>
            ))}

            <Pagination.Next onClick={() => paginationHandler(current + 1)} disabled={current >= totalItems - 1} />
            <Pagination.Last onClick={() => paginationHandler(totalItems - 1)} disabled={current >= totalItems - 1} />
        </Pagination>
    );
}

export default CustomPagination;