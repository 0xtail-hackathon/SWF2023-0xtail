pragma solidity ^0.4.23;

import "./math/SafeMath.sol";


/**
 * @title Crowdsale
 */
contract Crowdsale {
    using SafeMath for uint256;

    // Address where funds are collected
    address public wallet;

    // How many token units a buyer gets per wei
    uint256 public rate;

    // Amount of wei raised
    uint256 public weiRaised;

    // How much wei account has funded. Address -> wei
    mapping(address => uint256) public weiMap;

    // Max amount of wei to be contributed
    uint256 public cap;

    /**
    * Event for token purchase logging
    * @param purchaser who paid for the tokens
    * @param beneficiary who got the tokens
    * @param value weis paid for purchase
    * @param amount amount of tokens purchased
    */
    event TokenPurchase(
        address indexed purchaser,
        address indexed beneficiary,
        uint256 value,
        uint256 amount
    );

    /**
    * Event for reached cap logging
    * @param weiRaised wei raised for crowdsale
    * @param cap cap set for crowdsale
    */
    event CapReached(
        uint256 indexed weiRaised,
        uint256 indexed cap
    );

   /**
   * @param _rate Number of token units a buyer gets per wei - 1
   * @param _wallet Address where collected funds will be forwarded to - admin address
   * @param _cap Max amount of wei to be contributed
   */
    constructor(uint256 _rate, address _wallet, uint256 _cap) public {
        require(_rate > 0);
        require(_wallet != address(0));
        require(_cap > 0);

        rate = _rate;
        wallet = _wallet;
        cap = _cap;

    }

    // -----------------------------------------
    // Crowdsale external interface
    // -----------------------------------------

   /**
   * @dev fallback function ***DO NOT OVERRIDE***
   */
    function () external payable {
        buyTokens(msg.sender);
    }

    /**
    * @dev Return cap of crowdsale
    * @return Cap amount
    */
    function cap() public view returns (uint256) {
        return cap;
    }

    /**
    * @dev Checks whether the cap has been reached.
    * @return Whether the cap was reached
    */
    function capReached() public view returns (bool) {
        return weiRaised >= cap;
    }

    /**
    * @dev Returns funded amount by the address.
    * @param buyer Address performed funding
    * @return funded amount of the address
    */
    function fundAmount(address buyer) public view returns (uint256) {
        return weiMap[buyer];
    }

   /**
   * @dev low level token purchase ***DO NOT OVERRIDE***
   * @param _beneficiary Address performing the token purchase
   */
    function buyTokens(address _beneficiary) public payable {

        uint256 weiAmount = msg.value;
        _preValidatePurchase(_beneficiary, weiAmount);

        // calculate token amount to be created
        uint256 amount = _getTokenAmount(weiAmount);

        // update state
        weiRaised = weiRaised.add(weiAmount);

        _processPurchase(_beneficiary, amount);
        emit TokenPurchase(
            msg.sender,
            _beneficiary,
            weiAmount,
            amount
        );

        _postValidatePurchase();

    }

    // -----------------------------------------
    // Internal interface (extensible)
    // -----------------------------------------

   /**
   * @dev Validation of an incoming purchase. Use require statements to revert state when conditions are not met. Use super to concatenate validations.
   * @param _beneficiary Address performing the token purchase
   * @param _weiAmount Value in wei involved in the purchase
   */
    function _preValidatePurchase(
        address _beneficiary,
        uint256 _weiAmount
    )
    internal view
    {
        require(_beneficiary != address(0));
        require(_weiAmount != 0);
        require(weiRaised.add(_weiAmount) <= cap, "cap reached");
    }

    /**
   * @dev Validation of an executed purchase. Observe state and use revert statements to undo rollback when valid conditions are not met.
   */
    function _postValidatePurchase()
    internal
    {
        if(weiRaised == cap) {
            emit CapReached(
                weiRaised,
                cap
            );
        }
    }

   /**
   * @dev Source of tokens. Override this method to modify the way in which the crowdsale ultimately gets and sends its tokens.
   * @param _beneficiary Address performing the token purchase
   * @param _tokenAmount Number of tokens to be emitted
   */
    function _deliverTokens(
        address _beneficiary,
        uint256 _tokenAmount
    )
    internal
    {

        uint256 before = weiMap[_beneficiary];
        uint256 newAmount = before.add(_tokenAmount);
        weiMap[_beneficiary] = newAmount;
    }

   /**
   * @dev Executed when a purchase has been validated and is ready to be executed. Not necessarily emits/sends tokens.
   * @param _beneficiary Address receiving the tokens
   * @param _tokenAmount Number of tokens to be purchased
   */
    function _processPurchase(
        address _beneficiary,
        uint256 _tokenAmount
    )
    internal
    {
        _deliverTokens(_beneficiary, _tokenAmount);
    }

   /**
   * @dev Override to extend the way in which ether is converted to tokens.
   * @param _weiAmount Value in wei to be converted into tokens
   * @return Number of tokens that can be purchased with the specified _weiAmount
   */
    function _getTokenAmount(uint256 _weiAmount)
    internal view returns (uint256)
    {
        return _weiAmount.mul(rate);
    }

}
