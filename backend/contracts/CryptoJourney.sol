// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/// @custom:security-contact contact@cryptojourney.com
contract CryptoJourney is ERC20, ERC20Burnable, Pausable, Ownable {
    // Enum representing the direction of the bet.
    enum BetDirection {
        DOWN,
        UP
    }

    struct Bet {
        // Base Amount to check the difference.
        uint base;
        // Amount to bet.
        uint amount;
        // 1 is up; 0 is down.
        BetDirection direction;
    }

    event Outcome(
        address indexed sender,
        BetDirection indexed direction,
        uint base,
        uint actual,
        uint bet_amount
    );

    mapping(address => bool) _activeBet;
    mapping(address => Bet) _bets;

    constructor(
        string memory name,
        string memory symbol,
        uint intialSupply
    ) ERC20(name, symbol) {
        _mint(msg.sender, intialSupply * 10**decimals());
    }

    // TODO: Get random direction from oracle.

    // Search for a bet in the contract.
    function hasBet(address account) public view returns(bool) {
        return _activeBet[account];
    }

    // Search for a bet in the contract.
    function getBet(address account) public view returns(Bet memory) {
        return _bets[account];
    }

    // Put in place a bet on the direction where the price of an asset will go.
    function putBet(
        uint current_amount,
        uint bet_amount,
        BetDirection direction
    ) public {
        // Check that the address can only place bet one at a time.
        require(_activeBet[msg.sender] != true, "Address already has a bet in place.");
        // Check if the user has enough token to place the bet.
        require(balanceOf(msg.sender) >= bet_amount, "Address does not have enough funds to place bet.");

        _activeBet[msg.sender] = true;
        _bets[msg.sender] = Bet(current_amount, bet_amount, direction);
    }

    // Claim the prize of a bet.
    function claimBet(uint current_amount) public {
        // Require that the addresses can only claim if they have a bet in place.
        require(_activeBet[msg.sender] == true, "Address does not have a bet in place.");

        Bet memory _bet = _bets[msg.sender];

        // Delete bet from contract.
        _activeBet[msg.sender] = false;
        delete _bets[msg.sender];

        // Check if the user guess the correct movement at the time of claim.
        if (_bet.direction == BetDirection.UP) {
            if (current_amount > _bet.base) {
                // Payout to msg.sender
                _mint(msg.sender, _bet.amount);
            } else {
                // Remove funds from msg.sender
                _burn(msg.sender, _bet.amount);
            }
        }

        if (_bet.direction == BetDirection.DOWN) {
            if (current_amount < _bet.base) {
                // Payout to msg.sender
                _mint(msg.sender, _bet.amount);
            } else {
                // transfer funds from msg.sender to contract
                _burn(msg.sender, _bet.amount);
            }
        }

        // Notify User outcome.
        emit Outcome(
            msg.sender,
            _bet.direction,
            _bet.base,
            current_amount,
            _bet.amount
        );
    }

    function pause() public onlyOwner {
        _pause();
    }

    function unpause() public onlyOwner {
        _unpause();
    }

    function mint(address to, uint256 amount) public onlyOwner {
        _mint(to, amount);
    }

    function _beforeTokenTransfer(
        address from,
        address to,
        uint256 amount
    ) internal override whenNotPaused {
        super._beforeTokenTransfer(from, to, amount);
    }
}
