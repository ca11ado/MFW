var Header = React.createClass({
    render: function(){
        return (
            <h1><b>MFW</b> - Mnemonica: find words</h1>
        );
    }
});

var InfoField = React.createClass({
    render: function(){
        return (
            <div id="infoField">{this.props.infoText}</div>
        );
    }
});

var Story = React.createClass({
    render: function(){
        return (
            <div id="story">{this.props.story}</div>
        );
    }
});

var SearchBar = React.createClass({
    searchHand: function(event){
        this.props.searchHandler(event.target.value);
    },
    componentDidMount: function(){
        $('#inputDigit').focus();
    },
        render: function(){
        return (
            <input id="inputDigit" type="search" onChange={this.searchHand}/>
        );
    }
});

var Word = React.createClass({
    addWordToStory: function(ev, reactId){
        this.props.addStory($(ev.currentTarget).text());
        //console.log('event %o', ev);
    },
    render: function(){
        return (
            <li onClick={this.addWordToStory} className="oneWord">{this.props.word}</li>
        );
    }
});

var WordsSet = React.createClass({
    render: function(){
        var emptyCouple = '...';
        var words = this.props.words.length
            ? this.props.words.map(function(word){
                 return <Word addStory = {this.props.addStory} word={word}/>;
        }.bind(this))
            : [<Word word={emptyCouple}/>];
        return (
            <ul className="wordsList">{words}</ul>
        );
    }
});


var WordsSetList = React.createClass({
    render: function(){
        var wordsSetList = this.props.wordsSetList.map(function(words){
            return <WordsSet addStory = {this.props.addStory} words = {words}/>;
        }.bind(this));
        return (
            <div>{wordsSetList}</div>
        );
    }
});




var HomePage = React.createClass({
    getInitialState: function() {
        return {words: [], infoText: 'Here will be information text', lastNumber:'', story:''};
    },
    searchHandler: function(number){
        this.props.service.findByCifrMethod(number, this.state.words, this.state.lastNumber)
            .done(
                function(err, result){
                    this.setState({infoText:err,words:result});
                    if (number.length%2 === 0) {
                        this.setState({lastNumber:number});
                    }
                }
            .bind(this));
    },
    addStory: function(word) {
        this.setState({story:this.state.story + word + ' '});
    },
    render: function(){
        return (
            <div id="wrapMain">
                <Header />
                <InfoField infoText={this.state.infoText} />
                <Story story={this.state.story} />
                <SearchBar searchHandler={this.searchHandler}/>
                <WordsSetList addStory = {this.addStory} wordsSetList = {this.state.words}/>
            </div>
        );
    }
});

React.render(
    <HomePage service={wordService}/>,
    document.body
);