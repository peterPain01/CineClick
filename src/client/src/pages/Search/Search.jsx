import { useEffect, useRef, useState } from "react";
import request from "../../modules/request";
import { ListMovie } from "../../components/ListMovie/ListMovie";
import { useLocation } from "react-router-dom";
import DropDown from "../../components/DropDown/DropDown";
import Loading from "../../components/Loading";

export function Search() {
    const pattern = new URLSearchParams(useLocation().search).get("pattern");
    const params = useRef({pattern: pattern, sort_by: "title", genres: [], page: 1, order: "asc"});
    const [data, set_data] = useState({movies: [], total_page: 1});
    const genres = [];
    const per_page = 6 * 2;
    const [isLoading, setIsLoading] = useState(true)

    function search() {
        setIsLoading(true)
        console.log(params.current);
        const url = new URL(request.baseURL + "movie/search");
        url.search = new URLSearchParams(params.current);
        request.get(url, res => {
            set_data(res.data)
            setIsLoading(false)
        });
    }
    useEffect(() => {
        search();
    }, []);

    if(isLoading){
        return <Loading/>
    }
    return (
        <div>
            <div>
                <div style={{marginTop: "60px", marginLeft: "60px"}}>
                    <DropDown on_selected_choice={(sort_by) => {
                        params.current.sort_by = sort_by;
                        params.current.page = 1;
                        search();
                    }} title={"Sort by"} minWidth="120px" contentList={["Title", "Imdb", "Release"]}/>
                    <DropDown on_selected_choice={(order) => {
                        params.current.order = order;
                        params.current.page = 1;
                        search();
                    }} title={"Order"} minWidth="80px" contentList={["Asc", "Desc"]}/>
                </div>
            </div>
            <ListMovie
                header={`Result with '${params.current.pattern}'`}
                movies={data.movies}
                total_page={data.total_page}
                on_change_page={(page) => {
                    params.current.page = page;
                    search();
                }}
            ></ListMovie>
        </div>
    );
}

