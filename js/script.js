var Header = React.createClass({
    render: function(){
        return (
            <h1><b>MFW</b> - Mnemonica: find words</h1>
        );
    }
});

var SearchBar = React.createClass({
    render: function(){
        return (
            <input type="search" />
        );
    }
});

var Word = React.createClass({
    render: function(){
        return (
            <span className="oneWord"></span>
        );
    }
});

var WordsSet = React.createClass({
    render: function(){
        return (
            <div className="wordsset">

            </div>
        );
    }
});




var HomePage = React.createClass({
    render: function(){
        return (
            <div>
                <Header />
                <SearchBar />
                <WordsSet />
            </div>
        );
    }
});

React.render(
    <HomePage/>,
    document.body
);