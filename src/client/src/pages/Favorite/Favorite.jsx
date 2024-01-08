import { useEffect, useState } from "react";
import request from "../../modules/request";
import { ListMovie } from "../../components/ListMovie/ListMovie";

export function Favorite() {
    const [data, set_data] = useState({movies: [], total_page: 1});
    const per_page = 6 * 2;
    function get_fav_list(page) {
        request.get(`viewer/list-favorite?page=${page}&per_page=${per_page}`, res => {
            set_data(res.data);
        });
    }
    useEffect(() => {
        get_fav_list(1);
    }, []);
    return (
        <ListMovie
            header="Favorite Movies"
            movies={data.movies}
            total_page={data.total_page}
            on_change_page={get_fav_list}
        ></ListMovie>
    );
}
