
CREATE TABLE IF NOT EXISTS "wiki_spaces" (
    space_id     uuid         primary key,
    space_name   varchar(48)  unique
);

CREATE TABLE IF NOT EXISTS "wiki_pages" (
    page_id      uuid         primary key,
    space_id     uuid         REFERENCES wiki_spaces(space_id),
    title        varchar(48)  unique,
    update_time  timestamp(0) with time zone,
    content      text
);

create user wiki_c with password 'foobar';
alter user postgres with password 'foobar';

grant select on wiki_spaces to wiki_c;
grant select on wiki_pages to wiki_c;
