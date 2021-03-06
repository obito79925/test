import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';

interface Props {
    eq: string,
    result: string
}

interface State {
    eq: string,
    result: string
}

class Touchables extends React.Component <Props, State>{
    // 定义一个构造函数
    constructor(props: Props){
        super(props);
        this.state = {
            eq: this.props.eq,
            result: this.props.result,
        }
    }
    _onPressButton (num: string) {
        let eq_tmp : string = this.state.eq;
        eq_tmp = eq_tmp + num;
        let last : string = eq_tmp.substring(eq_tmp.length-1);//表达式的最后一位
        let second : string = eq_tmp.substring(eq_tmp.length-2,eq_tmp.length-1);//表达式的倒数第二位
        let two : string = eq_tmp.substring(eq_tmp.length-2); //表达式的最后两位组成的字符串
        switch (num) {
            case '+':
            case '-':
            case '*':
            case '/':
                //每当按下+-*/四个操作符时都会判断前面的(倒数第二位)字符串是否也是+-*/四个操作符中的任何一个，
                //如果是的话就让最后一个操作符代替(replace()方法)最后两个操作符，然后更新状态
                if(second === '+'||second === '-'||second === '*'||second === '/')
                {
                    eq_tmp = eq_tmp.replace(two,last);
                    this.setState({
                        eq: eq_tmp
                    });
                }
                break;
            case '=':
                eq_tmp = eq_tmp.substring(0, eq_tmp.length-1)
                break;
            case 'AC':
                eq_tmp = ""
                break;
        }
        //当按下=号的时候让结果(result)为eval(eq_tmp)，然后等式eq为空
        //清除掉输入的表达式，方便下一次输入
        if(num === '=')
        {
            this.setState({
                result: eval(eq_tmp),
                eq: "",
            });
        }
        else
        {
            this.setState({
                eq: eq_tmp
            });
        }
        if(num === 'AC')  //判断是否点击了AC键，清除输入和结果
        {
            this.setState({
                eq: eq_tmp,
                result: '0'
            });
        }
    }

    render() {
        return (
            <div>
                {/*算式*/}
                <div className="resultText">{this.state.eq}</div>
                {/*输出结果*/}
                <div className="resultText">{this.state.result}</div>
                <table>
                    <tbody>
                    <tr className="buttonContainer">
                        <th className="topButton" onClick={()=>this._onPressButton('AC')}>AC</th>
                        <th className="topButton" onClick={()=>this._onPressButton('')}>+/-</th>
                        <th className="topButton" onClick={()=>this._onPressButton('')}>%</th>
                        <th className="topButton" onClick={()=>this._onPressButton('/')}>÷</th>
                    </tr>
                    <tr className="buttonContainer">
                        <th className="centerButton" onClick={()=>this._onPressButton('7')}>7</th>
                        <th className="centerButton" onClick={()=>this._onPressButton('8')}>8</th>
                        <th className="centerButton" onClick={()=>this._onPressButton('9')}>9</th>
                        <th className="rightButton" onClick={()=>this._onPressButton('*')}>x</th>
                    </tr>
                    <tr className="buttonContainer">
                        <th className="centerButton" onClick={()=>this._onPressButton('4')}>4</th>
                        <th className="centerButton" onClick={()=>this._onPressButton('5')}>5</th>
                        <th className="centerButton" onClick={()=>this._onPressButton('6')}>6</th>
                        <th className="rightButton" onClick={()=>this._onPressButton('-')}>-</th>
                    </tr>
                    <tr className="buttonContainer">
                        <th className="centerButton" onClick={()=>this._onPressButton('1')}>1</th>
                        <th className="centerButton" onClick={()=>this._onPressButton('2')}>2</th>
                        <th className="centerButton" onClick={()=>this._onPressButton('3')}>3</th>
                        <th className="rightButton" onClick={()=>this._onPressButton('+')}>+</th>
                    </tr>
                    <tr className="buttonContainer">
                        <th colSpan={2}  className="zeroButton" onClick={()=>this._onPressButton('0')}>0</th>
                        <th className="centerButton" onClick={()=>this._onPressButton('.')}>.</th>
                        <th className="rightButton" onClick={()=>this._onPressButton('=')}>=</th>
                    </tr>
                    </tbody>
                </table>
            </div>
        );
    }
}

reportWebVitals();

export default Touchables