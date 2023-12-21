import React, { useEffect } from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import IconButton from "@mui/material/IconButton";
import {
    Close,
    FilterList,
} from "@mui/icons-material";
import {
    Grid,
    Link,
    Typography,
} from "@mui/material";
import Dropdown from './../global/dropdown';
import SearchBox from "../global/searchbox";

export default function FilterSite(props) {

    const [originators, setOriginators] = React.useState("");
    const [originatorsList, setOriginatorsList] = React.useState([]);

    const [status, setStatus] = React.useState("");
    const [statusList, setStatusList] = React.useState<string[]>([]);

    const [location, setLocation] = React.useState("");
    const [locationList, setLocationList] = React.useState([]);

    const [comodity, setComodity] = React.useState("");
    const [comodityList, setComodityList] = React.useState([]);

    const [search, setSearch] = React.useState("");

    const [anchorEl, setAnchorEl] = React.useState(null);

    const checkStat = (value) => {
        if (value === "Close") {
            return "CLOSE"
        }
        if (value === "Open") {
            return "OPN"
        }
        else {
            return ""
        }
    }

    const Searchit = (item, search) => {
        return Object.keys(item).some((key) => {
            if (typeof item[key] === 'string') {
                return item[key].toLowerCase().includes(search.toLowerCase());
            }
        })
    }


    console.log(props.siteList)

    const filterData = async (target, value) => {
        console.log(target, value)
        const data =
            (await props?.siteList?.allBuyingPlan.length) > 0 &&
            props.siteList.allBuyingPlan.filter((group) => {
                if (group.buyingPlans.length > 0) {
                    return group.buyingPlans.some(
                        (item) =>
                            (value === "originators" ? (target.length > 0 ? item.originators.some((val) => target.includes(val.originatorName))
                                : true) : (originators?.length > 0
                                    ? item.originators.some((val) => originators.includes(val.originatorName))
                                    : true)) &&
                            (value === "status" ? (target.length > 0 ? checkStat(target).includes(item.status)
                                : true) : (status?.length > 0
                                    ? checkStat(status).includes(item.Status)
                                    : true)) &&
                            (value === "location" ? (target.length > 0 ? target.includes(item.location)
                                : true) : (location?.length > 0
                                    ? location.includes(item.location)
                                    : true)) &&
                            (value === "comodity" ? (target.length > 0 ? target.includes(item.commodityVarianceName)
                                : true) : (comodity?.length > 0
                                    ? comodity.includes(item.commodityVarianceName)
                                    : true)) &&
                            (value === "search" ? (target.length > 0 ? Searchit(item, target)
                                : true) : (search?.length > 0
                                    ? search.includes(item.commodityVarianceName)
                                    : true))
                    );
                }
            })
        console.log(data, originators, props.siteList)
        props.setBuyingList(data);
    };

    const filterDefault = async () => {
        let originatorsLists = await props.siteList.originators?.map((x) => x?.originatorName);
        originatorsLists = Array.from(new Set(originatorsLists));
        setOriginatorsList(originatorsLists);

        let statusLists = ["Open", "Close"]
        setStatusList(statusLists);

        let comodityLists = await props.siteList.commodities?.map((x) => x?.commodityVarianceDesc);
        comodityLists = Array.from(new Set(comodityLists));
        setComodityList(comodityLists);

        let locationLists = await props.siteList.locations?.map((x) => x?.locationName);
        locationLists = Array.from(new Set(locationLists));
        setLocationList(locationLists);
    };

    useEffect(() => {
        filterDefault();
    }, [props?.siteList])

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleOriginators = (event) => {
        setOriginators(event.target.value)
        filterData(event.target.value, "originators")
    };

    const handleLocation = (event) => {
        setLocation(event.target.value)
        filterData(event.target.value, "location")
    };

    const handleStatus = (event) => {
        setStatus(event.target.value)
        filterData(event.target.value, "status")
    };

    const handleComodity = (event) => {
        setComodity(event.target.value)
        filterData(event.target.value, "comodity")
    };

    const handleSearch = (event) => {
        setSearch(event.target.value)
        filterData(event.target.value, "search")
        console.log(event.target.value)
    };

    const resetFilter = () => {
        props?.resetFilter();
        setOriginators("")
        setComodity("")
        setStatus("")
        setLocation("")
        setSearch("")
    }

    return (
        <div>
            <Button
                aria-controls="simple-menu"
                aria-haspopup="true"
                onClick={handleClick}
                style={{ color: "#007582" }}
            >
                <FilterList />
            </Button>
            <Menu
                sx={{ top: "35px", left: "13px", paddingBottom: "10px !important" }}
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
                className="filterMenu"
                anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                }}
            >
                <Grid container justifyContent="space-between">
                    {/* <IgnoreDisabledListItem disabled> */}
                    <Typography
                        style={{
                            fontSize: "18px",
                            fontWeight: "700",
                            paddingTop: "8px",
                            paddingBottom: "10px",
                        }}
                        variant="caption"
                        display="block"
                        gutterBottom
                    >
                        Filters <Link variant="body2" onClick={resetFilter}> Clear </Link>
                    </Typography>
                    <IconButton onClick={handleClose}>
                        <Close />
                    </IconButton>
                </Grid>
                <Typography className="formTypo">
                    Assigned To
                </Typography>
                <Dropdown width={270} defaultValue="Select Originator" value={originators} handleChange={handleOriginators} name={originatorsList || []} />
                <Typography className="formTypo">
                    Status
                </Typography>
                <Dropdown width={270} defaultValue="Select Status" value={status} handleChange={handleStatus} name={statusList || []} />
                <Typography className="formTypo">
                    Location
                </Typography>
                <Dropdown width={270} defaultValue="Select Location" value={location} handleChange={handleLocation} name={locationList || []} />
                <Typography className="formTypo">
                    Commodity
                </Typography>
                <Dropdown width={270} defaultValue="Select Commodity" value={comodity} handleChange={handleComodity} name={comodityList || []} />

                <SearchBox handleChange={handleSearch} value={search} />
            </Menu>
        </div>
    );
}
