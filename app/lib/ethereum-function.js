// get the latest block
/*web3.eth.filter('latest').watch(function(e, blockHash) {
    if(!e) {
        web3.eth.getBlock(blockHash, function(e, block){
            Session.set('latestBlock', block);
        });
    }
});
*/

/*
var unlockAccount = function(account, password) {
	if(! web3.personal.unlockAccount(account,password)){
		alert('Account ' + account + 'cannot unlock');
	} else {
		alert('Account unlock!!!');
	}
}
*/