# [React Tutorial](https://facebook.github.io/react/tutorial/tutorial.html)を実施します

* スタート時のコードは[こちら](https://codepen.io/ericnakagawa/pen/vXpjwZ)
* Tutorialのタイムトラベル機能では、xIsNextの設定がstepの奇数・偶数で設定されており、正しい値でない場合があるため、現在のXとOの数を数えて設定するように修正。

修正前：

```
jumpTo(step) {
  this.setState({
    stepNumber: step,
    xIsNext: (step % 2) ? false : true,
  });
}
```

修正後：

```
jumpTo(step) {
    var countX = 0;
    var countO = 0;
    for(var i = 0; i < this.state.history[step].squares.length; i++){
        switch (this.state.history[step].squares[i]){
            case 'X':
                countX++;
                break;
            case 'O':
                countO++;
                break;
            default:
                break;
        }
    }

    this.setState({
        stepNumber: step,
        xIsNext: (countX == countO) ? true : false 
    });
}
```

## 以下で動くようにしています

```teriminal
npm install
npm run build
npm run start
```

* npm run startでhttpサーバが立ち上がり、```http://localhost:8080```で確認できます。
