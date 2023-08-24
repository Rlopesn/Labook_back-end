CREATE TABLE
    users (
        id TEXT PRIMARY KEY NOT NULL,
        name TEXT NOT NULL,
        email TEXT NOT NULL,
        password TEXT NOT NULL,
        role TEXT NOT NULL,
        created_at TEXT DEFAULT(DATETIME())
    );

INSERT INTO
    users(id, name, email, password, role)
VALUES (
        "u001",
        "Rafael Lopes",
        "Rafael@email",
        "123456",
        "yes"
    ), (
        "u002",
        "Ana Clara",
        "Ana@email",
        "554556",
        "yes"
    ), (
        "u003",
        "Aria",
        "Aria@email",
        "990630",
        "yes"
    );

CREATE TABLE
    post (
        id TEXT PRIMARY KEY NOT NULL,
        creator_id TEXT NOT NULL,
        content TEXT NOT NULL,
        likes INTEGER,
        dislikes INTEGER,
        created_at TEXT DEFAULT(DATETIME()),
        updated_at TEXT DEFAULT(DATETIME()),
        FOREIGN KEY (creator_id) REFERENCES users(id)
    );

INSERT INTO
    post(
        id,
        creator_id,
        content,
        likes,
        dislikes
    )
VALUES (
        "p001",
        "u001",
        "Hoje o tempo esta fechado!",
        3,
        1
    );

CREATE TABLE
    likes_dislikes(
        user_id TEXT NOT NULL,
        post_id TExt NOT NULL,
        like INTEGER,
        FOREIGN KEY (user_id) REFERENCES users(id),
        FOREIGN KEY (post_id) REFERENCES post(id)
    );