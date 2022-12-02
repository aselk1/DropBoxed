from app.models import db, File, Folder, environment, SCHEMA


# Adds a demo user, you can add other users here if you want
def seed_files():
    file1 = File(
        name='The Lion, the Witch and the Wardrobe',
        desc='By: C. S. Lewis',
        file_url='https://dropboxed123.s3.us-west-1.amazonaws.com/00f5f6e40f5f41b4b7ebe3945a0a15cb.pdf',
        user_id=2,
        private=False
        )
    file2 = File(
        name='Prince Caspian',
        desc='By: C. S. Lewis',
        file_url='https://dropboxed123.s3.us-west-1.amazonaws.com/4c9863a50bd74863b39dcef0351cb7e4.pdf',
        user_id=2,
        private=False
        )
    file3 = File(
        name='Downtown',
        file_url='https://dropboxed123.s3.us-west-1.amazonaws.com/4dc1bb59f4cd4b98b9a59b8e8058f6f5.mp3',
        user_id=2,
        private=False
        )
    file4 = File(
        name='Piano',
        file_url='https://dropboxed123.s3.us-west-1.amazonaws.com/17fff56bf1814382b168f210190b6ced.mp3',
        user_id=2,
        private=False
    )
    file5 = File(
        name='Scenery',
        file_url='https://dropboxed123.s3.us-west-1.amazonaws.com/3d1eab8266c24e3b90f8801fd25f1560.jpeg',
        user_id=2,
        private=False
        )
    file6 = File(
        name='Lake',
        file_url='https://dropboxed123.s3.us-west-1.amazonaws.com/def28a5886f64305a0aac7c7d0c64637.jpeg',
        user_id=2,
        private=False
        )
    db.session.add(file1)
    db.session.add(file2)
    db.session.add(file3)
    db.session.add(file4)
    db.session.add(file5)
    db.session.add(file6)

    folder1 = Folder(
        name='Pictures',
        user_id=2,
        private=False
        )
    folder2 = Folder(
        name='Music',
        user_id=2,
        private=False
        )
    folder3 = Folder(
        name='Books',
        user_id=2,
        private=False
        )

    db.session.add(folder1)
    db.session.add(folder2)

    folder1.files.append(file5)
    folder1.files.append(file6)
    folder2.files.append(file3)
    folder2.files.append(file4)
    folder3.files.append(file1)
    folder3.files.append(file2)




    db.session.commit()
# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_files():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.files RESTART IDENTITY CASCADE;")
        db.session.execute(f"TRUNCATE table {SCHEMA}.folders RESTART IDENTITY CASCADE;")
        db.session.execute(f"TRUNCATE table {SCHEMA}.folder_files RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM files")
        db.session.execute("DELETE FROM folders")
        db.session.execute("DELETE FROM folder_files")

    db.session.commit()
