from app.models import db, folder_files, environment, SCHEMA


# Adds a demo user, you can add other users here if you want
def seed_folder_files():
    combo1 = folder_files(
        folder_id=1,
        file_id=1
        )
    combo2 = folder_files(
        folder_id=1,
        file_id=2
        )
    combo3 = folder_files(
        folder_id=1,
        file_id=3
        )
    combo4 = folder_files(
        folder_id=1,
        file_id=4
        )
    combo5 = folder_files(
        folder_id=1,
        file_id=5
        )
    combo6 = folder_files(
        folder_id=2,
        file_id=1
        )
    combo7 = folder_files(
        folder_id=2,
        file_id=2
        )
    combo8 = folder_files(
        folder_id=2,
        file_id=3
        )
    combo9 = folder_files(
        folder_id=2,
        file_id=4
        )
    combo10 = folder_files(
        folder_id=2,
        file_id=5
        )

    db.session.add(combo1)
    db.session.add(combo2)
    db.session.add(combo3)
    db.session.add(combo4)
    db.session.add(combo5)
    db.session.add(combo6)
    db.session.add(combo7)
    db.session.add(combo8)
    db.session.add(combo9)
    db.session.add(combo10)

    db.session.commit()
# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_folder_files():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.folder_files RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM folder_files")

    db.session.commit()
