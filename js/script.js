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
            <div id="wrapInfoField">{this.props.infoText}</div>
        );
    }
});

var Story = React.createClass({
    clearClick: function(){
        this.props.clearStory();
    },
    render: function(){
        var Story = this.props.story.map(function(word,index){
            return word + ' ';
        }.bind(this));
        var clear = Story.length ? 'x' : '';
        return (
            <div id="wrapStory"><p className="text-success">{Story}<span onClick={this.clearClick} id="clearStory">{clear}</span></p></div>
        );
    }
});

var SearchBar = React.createClass({
    searchHand: function(event){
        this.props.searchHandler(event.target.value);
    },
    render: function(){
        return (
            <div id="wrapSearchBar">
                <form>
                    <input id="inputDigit" type="search" onChange={this.searchHand}/>
                </form>
            </div>
        );
    }
});

var Word = React.createClass({
    getInitialState: function(){
        return {cssName:'wordOfSet'+this.props.numberOfSet}
    },
    addWordToStory: function(ev, reactId){
        this.props.addStory($(ev.currentTarget).text(),this.props.numberOfSet);
        //console.log('orderSet %o', this.props.numberOfSet);
        $('.'+ this.state.cssName).removeClass('selectedWord');
        $(ev.currentTarget).addClass('selectedWord');

    },
    render: function(){
        return (
            <li onClick={this.addWordToStory} className={this.state.cssName}>{this.props.word}</li>
        );
    }
});

var WordsSet = React.createClass({
    render: function(){
        var emptyCouple = '...';
        var words = this.props.words.length
            ? this.props.words.map(function(word, index){
                return <Word numberOfSet={this.props.numberOfSet} addStory = {this.props.addStory} word={word}/>;
        }.bind(this))
            : [<Word word={emptyCouple}/>];
        return (
            <ul className="wordsList">{words}</ul>
        );
    }
});


var WordsSetList = React.createClass({
    render: function(){
        var wordsSetList = this.props.wordsSetList.map(function(words,index){
            return <WordsSet numberOfSet={index} addStory = {this.props.addStory} words = {words}/>;
        }.bind(this));
        var header = wordsSetList.length ? 'Выбери слова:' : '';
        return (
            <div id="wrapWordsLists">
                <h4>{header}</h4>
                {wordsSetList}
            </div>
        );
    }
});




var HomePage = React.createClass({
    getInitialState: function() {
        return {words: [], infoText: 'Here will be information text', lastNumber:'', story:[]};
    },
    componentDidMount: function(){
        $('#inputDigit').focus();
    },
    componentDidUpdate: function(){
        $('#inputDigit').focus();
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
    addStory: function(word, numberOfSet) {
        var story = this.state.story;
        story[numberOfSet] = word;
        this.setState({story:story});
    },
    clearStory: function(){
        this.setState({story:[]});
        $('li').removeClass('selectedWord');
    },
    render: function(){
        return (
            <div id="wrapMain">
                <Header />
                <InfoField infoText={this.state.infoText} />
                <SearchBar searchHandler={this.searchHandler}/>
                <Story clearStory={this.clearStory} story={this.state.story} />
                <WordsSetList addStory = {this.addStory} wordsSetList = {this.state.words}/>
            </div>
        );
    }
});

React.render(
    <HomePage service={wordService}/>,
    document.body
);