from app.models import db, Folder, environment, SCHEMA


# Adds a demo user, you can add other users here if you want
def seed_folders():
    folder1 = Folder(
        name='File1',
        user_id=1,
        private=False
        )
    folder2 = Folder(
        name='File2',
        user_id=2,
        private=True
        )

    db.session.add(folder1)
    db.session.add(folder2)

    db.session.commit()
# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_folders():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.folders RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM folders")

    db.session.commit()
