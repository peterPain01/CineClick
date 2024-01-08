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

insert into "Genre" values(DEFAULT, 'action');
insert into "Genre" values(DEFAULT, 'crime');
insert into "Genre" values(DEFAULT, 'drama');
insert into "Genre" values(DEFAULT, 'fantasy');
insert into "Genre" values(DEFAULT, 'horror');
insert into "Genre" values(DEFAULT, 'comedy');
insert into "Genre" values(DEFAULT, 'history');
insert into "Genre" values(DEFAULT, 'romance');
insert into "Genre" values(DEFAULT, 'sci-fi');
insert into "Genre" values(DEFAULT, 'family');
insert into "Genre" values(DEFAULT, 'film-noir');
insert into "Genre" values(DEFAULT, 'music');
insert into "Genre" values(DEFAULT, 'animation');
insert into "Genre" values(DEFAULT, 'documentary');
insert into "Genre" values(DEFAULT, 'sport');
insert into "Genre" values(DEFAULT, 'biography');
insert into "Genre" values(DEFAULT, 'adventure');
insert into "Genre" values(DEFAULT, 'thriller');
insert into "Genre" values(DEFAULT, 'mystery');
insert into "Genre" values(DEFAULT, 'war');
insert into "Genre" values(DEFAULT, 'western');

create table "MovieGenre"(
    mv_id bigserial,
    genre_id serial,
    primary key(mv_id, genre_id),
    -- foreign key(mv_id) references "Movie"(id)
    foreign key(genre_id) references "Genre"(id)
);

create table "MovieSimilar"(
    mv_id bigserial,
    similar_id bigserial,
    primary key(mv_id, similar_id),
    foreign key(mv_id) references "Movie"(id),
    foreign key(similar_id) references "Movie"(id)
);

create table "MovieFavorite"(
    email varchar(512),
    movie bigserial,
    primary key(email, movie),
    foreign key(email) references "UserInfo"(email),
    foreign key(movie) references "Movie"(id)
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
    if g_id is null then
        insert into "Genre" values(DEFAULT, g);
        select id into g_id from "Genre" where genre = g;
    end if;
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

-- Create the Plan table
CREATE TABLE plan (
    plan_id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    price VARCHAR(20) NOT NULL,
    devices VARCHAR(255) NOT NULL,
    registered INTEGER NOT NULL,
    videoQuality VARCHAR(255) NOT NULL,
    resolution VARCHAR(20) NOT NULL, 
    duration int not null
);

-- Insert data into the Plan table
INSERT INTO plan (name, price, devices, registered, videoQuality, resolution, duration)
VALUES 
    ('1 month', '3', 'phone, tablet', 0, 'Good', '480p', 1),
    ('3 months', '8', 'phone, tablet, computer, TV', 0, 'Good', '720p',3),
    ('6 months', '15', 'phone, tablet, computer, TV', 0, 'Better', '1080p',6),
    ('1 year', '28', 'phone, tablet, computer, TV', 0, 'Best', '4k+HDR',12);
