export const globalGroups = {
    title: "Group",
    items: [
        {
            'title': "Company",
            "value": "company_name",
            "sortType": "alphabet"
        },
        {
            'title': "Incident Type",
            "value": "incident_type",
            "sortType": "alphabet"
        },
        {
            'title': "Time (Day)",
            "value": "day",
            "sortType": "day",
            "default": true
        },
        {
            'title': "Time (Month)",
            "value": "month",
            "sortType": "month"
        },
        {
            'title': "Time (Year)",
            "value": "year",
            "sortType": "month"
        }
    ]
}

export const globalSort = {
    title: "Sort",
    items: [
        {
            'title': "Ascending",
            "value": "asc"
        },
        {
            'title': "Descending",
            "value": "dsc",
            "default": true
        }
    ]
}

export const globalAll = [globalGroups, globalSort];

export function getGlobalDefaultState() {
    let result = {};

    globalAll.map((button) => {
        result[button.title.toLowerCase()] = {
            title: button.title,
            items: button.items.map((item) => ({ ...item, selected: (item.default || false) }))
        }
    })

    return result;
}

export default {
    globalGroups,
    globalSort,
    globalAll
}