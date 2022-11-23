from app.models import db, File, Folder, environment, SCHEMA


# Adds a demo user, you can add other users here if you want
def seed_files():
    file1 = File(
        name='File1',
        desc='File1',
        file_url='https://cdn.pixabay.com/photo/2012/08/27/14/19/mountains-55067__340.png',
        user_id=1,
        private=False
        )
    file2 = File(
        name='File2',
        desc='File2',
        file_url='https://iso.500px.com/wp-content/uploads/2014/07/big-one.jpg',
        user_id=2,
        private=True
        )
    file3 = File(
        name='File3',
        file_url='https://www.adorama.com/alc/wp-content/uploads/2018/11/landscape-photography-tips-yosemite-valley-feature.jpg',
        user_id=3,
        private=False
        )
    file4 = File(
        name='File4',
        file_url='https://i.natgeofe.com/n/8022bf25-d5ef-48c1-b460-dbac1448e122/09-9226610_uploadsmember665562yourshot-665562-9226610jpg_igdjhxksrjifxjzu4rgbsw37bhp3eflutfvvbpyjwjhzlmh4iziq_3000x2000.jpg',
        user_id=4,
        private=True
    )
    file5 = File(
        name='File5',
        desc='File5',
        file_url='https://petapixel.com/assets/uploads/2021/06/Social-Medias-Impact-on-Landscape-and-Nature-Photography.jpg',
        user_id=5,
        private=False
        )
    db.session.add(file1)
    db.session.add(file2)
    db.session.add(file3)
    db.session.add(file4)
    db.session.add(file5)

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

    folder1.files.append(file1)
    folder1.files.append(file2)
    folder1.files.append(file3)
    folder1.files.append(file4)
    folder1.files.append(file5)
    folder2.files.append(file1)
    folder2.files.append(file2)
    folder2.files.append(file3)
    folder2.files.append(file4)
    folder2.files.append(file5)



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
