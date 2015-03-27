var Header = React.createClass({
    render: function(){
        return (
            <h1><b>MFW</b> - Mnemonica: find words</h1>
        );
    }
});

var SearchBar = React.createClass({
    searchHand: function(event){
        this.props.searchHandler(event.target.value);
    },
    render: function(){
        return (
            <input type="search" onChange={this.searchHand}/>
        );
    }
});

var Word = React.createClass({
    render: function(){
        return (
            <li className="oneWord">{this.props.word.name}</li>
        );
    }
});

var WordsSet = React.createClass({
    render: function(){
        var words = this.props.words.map(function(word){
            return <Word word={word}/>;
        });
        return (
            <ul>{words}</ul>
        );
    }
});


var WordsSetList = React.createClass({
    render: function(){
        var wordsSetList = this.props.wordsSetList.map(function(words){
            return <WordsSet words = {words}/>;
        });
        return (
            <div>{wordsSetList}</div>
        );
    }
});




var HomePage = React.createClass({
    getInitialState: function() {
        return {words: []}
    },
    searchHandler: function(number){
        this.props.service.findByCifrMethod(number).done(function(result){ this.setState({words:result}) }.bind(this));
    },
    render: function(){
        return (
            <div>
                <Header />
                <SearchBar searchHandler={this.searchHandler}/>
                <WordsSetList wordsSetList = {this.state.words}/>
            </div>
        );
    }
});

React.render(
    <HomePage service={wordService}/>,
    document.body
);