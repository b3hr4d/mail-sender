## Check Balance and send email

*check address balance every 10 seconds and if its larger than 100 ETH send email to you*


### clone this repo

```
git clone git@github.com:b3hr4d/mail-sender.git
```

### copy .env.example to .env and fill it

```
cp .env.example .env
```

### install dependencies

```
npm install
```

or

```
yarn
```

### run

```
node index.js
```

### run in background

```
nohup node index.js &
```

### stop

```
ps -ef | grep node

kill -9 PID
```

### check log

```
tail -f nohup.out
```
