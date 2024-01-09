import { useEffect, useRef, useState } from "react";
import request from "../../modules/request";
import { ListMovie } from "../../components/ListMovie/ListMovie";
import { useLocation } from "react-router-dom";
import styles from "./Search.module.css";
import DropDown from "../../components/DropDown/DropDown";
import Loading from "../../components/Loading";
import ActionButton from "../../components/ActionButton/ActionButton";
import { faDotCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export function Search() {
    const pattern = new URLSearchParams(useLocation().search).get("pattern");
    const [rerender, toggle_to_rerender] = useState(false);
    const PER_ROW = 6;
    const params = useRef({
        pattern: pattern,
        sort_by: "title",
        page: 1,
        order: "asc",
        per_page: PER_ROW*2,
    });
    const [data, set_data] = useState({movies: [], total_page: 1});
    const genres = [];
    const per_page = 6 * 2;
    const [isLoading, setIsLoading] = useState(true)

    function search() {
        const url = new URL(request.baseURL + "movie/search");
        url.search = new URLSearchParams({
            ...params.current,
            include_genres: all_genres.current.filter(x => x.state === "add").map(x => x.text),
            exclude_genres: all_genres.current.filter(x => x.state === "minus").map(x => x.text),
        });
        request.get(url, res => {
            set_data(res.data)
            setIsLoading(false)
        });
    }
    function handle_click_filter_item(data) {
        console.log(data);
        if (data.state === "none") {
            data.state = "add";
        } else if (data.state === "add") {
            data.state = "minus"
        } else data.state = "none";
        toggle_to_rerender(!rerender);
    }
    const all_genres = useRef([]);
    useEffect(() => {
        request.get("movie/list-all-genres", res => {
            all_genres.current = res.data.map(text => {
                return {text, state: "none"};
            });
            toggle_to_rerender(!rerender);
        });
        search();
    }, []);

    if(isLoading){
        return <Loading/>
    }
    return (
        <div className={styles.container}>
            <div className={styles.side_filter}>
                <h3 style={{textAlign: "center", marginBottom: "10px", marginTop: "0px"}}>Filter</h3>
                <ul className={styles.filter_list}>
                    {all_genres.current.map((data, index) =>
                    <li key={index}>
                        <span className={styles.filter_item}>
                            <ActionButton
                            icon={<FontAwesomeIcon
                                    icon={faDotCircle}
                                    style={{ color: "#ffffff" }}
                                    size="lg"
                                />}
                                type="circle"
                                border="none"
                                bgc="rgba(0,0,0,0.5)"
                                click_event={() => {handle_click_filter_item(data)}}
                            >
                            </ActionButton>
                            <span
                                onClick={() => {handle_click_filter_item(data)}}
                                style={{margin: "auto 0px",
                                        cursor: "pointer",
                                        color: `${data.state === "none" ? "white" :
                                                  data.state === "add" ? "lightgreen"  :
                                                  "red" }`}}>{data.text}</span>
                        </span>
                    </li>
                    )}
                </ul>
                <button
                        onClick={() => {params.current.page = 1; search()}}
                        className={styles.filter_button}>Filter</button>
            </div>
            <div>
                <div>
                    <div style={{padding: "90px 60px 0px 60px", marginBottom: "-100px"}}>
                        <DropDown on_selected_choice={(sort_by) => {
                            if (sort_by.toLowerCase() === params.current.sort_by.toLowerCase()) return;
                            params.current.sort_by = sort_by;
                            params.current.page = 1;
                            search();
                        }} title={"Sort by"} minWidth="120px" contentList={["Title", "Imdb", "Release"]}/>
                        <DropDown on_selected_choice={(order) => {
                            if (order.toLowerCase() === params.current.order.toLowerCase()) return;
                            params.current.order = order;
                            params.current.page = 1;
                            search();
                        }} title={"Order"} minWidth="80px" contentList={["Asc", "Desc"]}/>
                    </div>
                </div>
                <ListMovie
                    header=""
                    movies={data.movies}
                    total_page={data.total_page}
                    on_change_page={(page) => {
                        if (page == params.current.page) return;
                        params.current.page = page;
                        search();
                    }}
                    per_row={PER_ROW}
                    item_space="0.1fr"
                ></ListMovie>
            </div>
        </div>
    );
}

