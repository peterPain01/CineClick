-- for google account, username and password are null
create table account(
    email varchar(512) not null,
    username varchar(128) unique,
    password varchar(512),
    type varchar(16) check (type = 'admin' or type = 'free-viewer' or type = 'premium-viewer'),
    primary key(email)
);
insert into account values('cineclick@gmail.com', 'admin', '$2b$10$LW6U2g4WSD7IMgumQ6uF9eAH6J5ZNaHeaI7WfAr8VBJn7QUxgmSqO', 'admin');
create table userinfo(
    email varchar(512) not null,
    name varchar(512),
    avatar varchar(2048),
    primary key(email),
    foreign key(email) references account(email)
);
create table premiuminfo(
    email varchar(512) not null,
    upgraded_date timestamp not null,
    expired timestamp not null,
    primary key(email),
    foreign key(email) references account(email)
);
create table movie(
    id bigserial not null,
    title varchar(128) not null,
    release date,
    imdb float,
    actors varchar(256),
    directors varchar(256),
    genres varchar(128),
    type varchar(10) not null check( type = 'premium' or type = 'free' or type = 'paid' ), -- free, premium, paid
    primary key(id)
);
