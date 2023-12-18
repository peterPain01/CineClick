-- for google account, password is null
create table "Account"(
    email varchar(512) not null,
    password varchar(512),
    type varchar(16) check (type = 'admin' or type = 'free-viewer' or type = 'premium-viewer'),
    primary key(email)
);
insert into "Account" values('cineclick@gmail.com', '$2b$10$LW6U2g4WSD7IMgumQ6uF9eAH6J5ZNaHeaI7WfAr8VBJn7QUxgmSqO', 'admin');

create table "UserInfo"(
    email varchar(512) not null,
    name varchar(512),
    avatar varchar(2048),
    primary key(email),
    foreign key(email) references "Account"(email)
);

create table "PremiumInfo"(
    email varchar(512) not null,
    upgraded_date timestamp not null,
    expired timestamp not null,
    primary key(email),
    foreign key(email) references "Account"(email)
);

create table "Movie"(
    id bigserial not null,
    title varchar(128) not null,
    release date,
    imdb float,
    restrict_age varchar(3),
    year varchar(4),
    actors varchar(1024),
    directors varchar(512),
    summary varchar(1024),
    image varchar(2048),
    length varchar(20),
    type varchar(10) not null check( type = 'premium' or type = 'free' or type = 'paid' ), -- free, premium, paid
    primary key(id)
);

create table "Genre"(
    id serial not null,
    genre varchar(20) unique,
    primary key(id)
);

insert into "Genre" values(DEFAULT, 'Action');
insert into "Genre" values(DEFAULT, 'Crime');
insert into "Genre" values(DEFAULT, 'Drama');
insert into "Genre" values(DEFAULT, 'Fantasy');
insert into "Genre" values(DEFAULT, 'Horror');
insert into "Genre" values(DEFAULT, 'Comedy');
insert into "Genre" values(DEFAULT, 'History');
insert into "Genre" values(DEFAULT, 'Romance');
insert into "Genre" values(DEFAULT, 'Sci-Fi');
insert into "Genre" values(DEFAULT, 'Family');
insert into "Genre" values(DEFAULT, 'Film-Noir');
insert into "Genre" values(DEFAULT, 'Music');
insert into "Genre" values(DEFAULT, 'Animation');
insert into "Genre" values(DEFAULT, 'Documentary');
insert into "Genre" values(DEFAULT, 'Sport');
insert into "Genre" values(DEFAULT, 'Biography');
insert into "Genre" values(DEFAULT, 'Adventure');
insert into "Genre" values(DEFAULT, 'Thriller');
insert into "Genre" values(DEFAULT, 'Mystery');
insert into "Genre" values(DEFAULT, 'War');
insert into "Genre" values(DEFAULT, 'Western');

create table "MovieGenre"(
    mv_id bigserial,
    genre_id serial,
    primary key(mv_id, genre_id),
    foreign key(mv_id) references "Movie"(id),
    foreign key(genre_id) references "Genre"(id)
);

create table "MovieSimilar"(
    mv_id bigserial,
    similar_id bigserial,
    primary key(mv_id, similar_id),
    foreign key(mv_id) references "Movie"(id),
    foreign key(similar_id) references "Movie"(id)
);

create table "PaidMovie"(
    id bigserial not null,
    price float not null check (price > 0),
    primary key(id),
    foreign key (id) references "Movie"(id)
);

create procedure add_genre(mv_id "Movie".id%TYPE, g "Genre".genre%TYPE) as $$
declare g_id "Genre".id%TYPE;
begin
    select id into g_id from "Genre" where genre = g;
    insert into "MovieGenre" values(mv_id, g_id);
end;
$$ language plpgsql;

create table "BoughtMovie"(
    email varchar(512) not null,
    mv_id bigserial not null,
    primary key(email, mv_id),
    foreign key(email) references "Account"(email),
    foreign key(mv_id) references "PaidMovie"(id)
);
