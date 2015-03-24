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


var HomePage = React.createClass({
    render: function(){
        return (
            <div>
                <Header />
                <SearchBar />
            </div>
        );
    }
});

React.render(
    <HomePage/>,
    document.body
);