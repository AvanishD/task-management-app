Setup your pc!!

First Run: npm install (To install all the necessary dependencies)

After that run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

Make a database named "taskmanager". The mongodb connection URI is mongodb://localhost:27017/taskmanager.

Make sure you have the local mongodb running.  

For Windows,
1. Start MongoDB without a configuration file (Default C:\data\db\ path):
shell - mongod
2. If the data folder does not exist, create it:
shell - mkdir C:\data\db
3. Run MongoDB with a custom path:
shell - mongod --dbpath "D:\path\to\your\db"
4. Run MongoDB as a Windows Service:
shell - net start MongoDB

For macOS,
1. If installed via Homebrew:
shell - brew services start mongodb-community
2. Manually start MongoDB:
shell - mongod --dbpath /usr/local/var/mongodb
3. Check MongoDB logs:
shell - tail -f /usr/local/var/log/mongodb/mongo.log

For Linux,
1. Start MongoDB as a service:
shell - sudo systemctl start mongod
2. Enable MongoDB to start on boot:
shell - sudo systemctl enable mongod
3. Check MongoDB status:
shell - sudo systemctl status mongod
4. Start MongoDB manually with a custom path:
shell - mongod --dbpath /var/lib/mongodb

Verify if mongodb is running or not,
Shell - mongo OR mongosh

Once all these steps are done, you are good to add, delete, update and read your tasks on the Task Management App.

