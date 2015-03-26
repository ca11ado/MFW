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
            <span className="oneWord">{this.props.word.name}</span>
        );
    }
});

var WordsSet = React.createClass({
    render: function(){
        var words = this.props.words.map(function(word){
            return <Word word={word}/>;
        });
        return (
            <div>{words}</div>
        );
    }
});




var HomePage = React.createClass({
    getInitialState: function() {
        return {words: []}
    },
    searchHandler: function(id){
        this.props.service.findById(id).done(function(result){ this.setState({words:[result]}) }.bind(this));
    },
    render: function(){
        return (
            <div>
                <Header />
                <SearchBar searchHandler={this.searchHandler}/>
                <WordsSet words = {this.state.words}/>
            </div>
        );
    }
});

React.render(
    <HomePage service={wordService}/>,
    document.body
);