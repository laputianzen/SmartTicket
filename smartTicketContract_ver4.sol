contract smartTicketContract{
    string public name;//concert name
    string public place;//concert place
    uint public ticketPrice;
    address public singer;
    address private supervisor;
    uint256 public ticketSupply;
    uint public withDrawalDeadline;
    uint public startTime;
    uint public endTime;
    bool private confirmSignal;
    mapping(address=>uint) public balanceOfTickets;
    enum State{OnSale,OnStage,Closed,Inactive,Cancel}
    State public state;
    event MoneyTransfer(address backer, uint amount, bool success);
    event TicketVerified(address buyer,bool istrue);
    
    modifier OnlySinger {
        if (msg.sender != singer) {throw;} 
        else { _}
    }
    
    modifier OnlySupervisor {
        if (msg.sender != supervisor) {throw;} 
        else { _}

    }
    function smartTicketContract(
        string _name,string _place,uint _ticketPrice,uint _ticketSupply,
        uint timeBeforeRefundDeadline,uint timeBeforestartTime,
        uint timeBeforeconcertendTime,address _supervisor)
    {
        name = _name;
        place = _place;
        ticketPrice = _ticketPrice;
        singer = msg.sender;
        supervisor = _supervisor;
        ticketSupply = _ticketSupply;
        withDrawalDeadline = now + timeBeforeRefundDeadline * 1 minutes;
        startTime = now + timeBeforestartTime * 1 minutes;
        endTime = now + timeBeforeconcertendTime* 1 minutes;
        balanceOfTickets[msg.sender] = _ticketSupply;
    }

    function cancelConcert()
    {
        if(msg.sender != singer) throw;
        if(state != State.OnSale) throw;
        
        state = State.Cancel;
    }
    
    function buyTicket(uint ticketwant)
    {
        if(state !=State.OnSale) throw;
    
        if (ticketSupply < ticketwant) throw;
        
        if (msg.value != ticketwant*ticketPrice*1 ether) throw; 
        
        ticketSupply-= ticketwant;
        balanceOfTickets[msg.sender]+=ticketwant;
        balanceOfTickets[singer]-=ticketwant;
                
        MoneyTransfer(msg.sender, msg.value, true);   
    }
    
    function safeWithdraw(uint ticketwithdraw){
        if(msg.sender == singer ||msg.sender == supervisor) throw;
        
        if (now > withDrawalDeadline) throw;//before Deadline
        
        if (ticketwithdraw >  balanceOfTickets[msg.sender]) throw;
        
        ticketSupply+= ticketwithdraw;
        balanceOfTickets[msg.sender]-=ticketwithdraw;
        balanceOfTickets[singer]+=ticketwithdraw;
       
       if(msg.sender.send(ticketwithdraw * ticketPrice * 1 ether))
            MoneyTransfer(this,ticketwithdraw * ticketPrice * 1 ether,true);
    }

    function StartConcert() OnlySinger {
        if (now >= startTime && state == State.OnSale){
            state = State.OnStage;
        } else{
            throw;
        }
    }

    function useTicket() {
        if (now >= startTime && balanceOfTickets[msg.sender] >= 1 && state == State.OnStage&& msg.sender!= singer){
            balanceOfTickets[msg.sender] -= 1;
            TicketVerified(msg.sender, true);
        } else {
            throw;
        }
        
    }

    function closeContract() OnlySinger {
        if (state != State.OnStage) throw;
        state = State.Closed;
    }

    function confirmEvent (bool _confirm) OnlySupervisor {
        if (state != State.Closed || now < endTime) throw;
        confirmSignal = _confirm;
        if (confirmSignal == false) 
        state = State.Cancel; 
}

     function getIncome () OnlySinger {
        if (confirmSignal == true) {
		    if (now>=endTime && state == State.Closed) {
    	        msg.sender.send(this.balance);
    		    MoneyTransfer(msg.sender, this.balance, true);
    		    state = State.Inactive;
			}
    	}
    }

    function refund () {
        if (msg.sender != singer) {
		    if (balanceOfTickets[msg.sender] != 0) {
			    msg.sender.send(balanceOfTickets[msg.sender] * ticketPrice * 1 ether);
				balanceOfTickets[msg.sender] = 0;
			}
			else {
			    throw;
			}
		}
		else {
		    throw;
		}
	}
}