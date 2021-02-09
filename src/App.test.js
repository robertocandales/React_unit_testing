import { shallow, mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import React from 'react';
import App from './App';
import AccountBalance from './components/AccountBalance';
import Notification from './components/Notification';

const useBalance = {
  balance: 1100,
  savingBalance: 103,
};

describe('rendering components', () => {
  it('renders App component without crashing', () => {
    shallow(<App />);
  });
  it('renders App component header without crashing', () => {
    const wrapper = shallow(<App />);
    const header = (
      <h1 className='has-text-centered title is-1'>Welcome in the personal finance app!</h1>
    );
    expect(wrapper.contains(header)).toEqual(true);
  });
  it('renders notification without crashing', () => {
    shallow(<Notification />);
  });
  it('render text info low balance in notification component', () => {
    const wrapper = shallow(<Notification />);
    const lowBalanceText = <p>Your account balance is very low.</p>;
    expect(wrapper.contains(lowBalanceText)).toBe(true);
  });
  it('renders button ', () => {
    const wrapper = mount(<AccountBalance accounts={useBalance} />);
    const label = wrapper.find('#balance-button').text();
    expect(label).toEqual('Send 100$');
  });
});

describe('passing props', () => {
  const accountWrapper = mount(<AccountBalance accounts={useBalance} />);
  const notificationWrapper = mount(<Notification balance={useBalance.balance} />);
  it('acepts user account props', () => {
    expect(accountWrapper.props().accounts).toEqual(useBalance);
  });
  it('contains savingBalance value', () => {
    const value = accountWrapper.find('.savings').text();
    const expectedValue = useBalance.savingBalance + '$';
    expect(value).toEqual(expectedValue);
  });
  it('notification accepts props', () => {
    expect(notificationWrapper.props().balance).toEqual(useBalance.balance);
  });
});

describe('logic', () => {
  const wrapper = mount(<AccountBalance accounts={useBalance} />);
  const notificationWrapper = mount(<Notification balance={useBalance.balance} />);
  wrapper.find('#balance-button').simulate('click');
  it('button click - update savings', () => {
    const savingsValue = wrapper.find('.savings').text();
    const expectedValue = useBalance.savingBalance + 100 + '$';
    expect(savingsValue).toEqual(expectedValue);
  });
  it('button click - update balance', () => {
    const balanceValue = wrapper.find('.balance').text();
    const expectedBalanceValue = useBalance.balance - 100 + '$';
    expect(balanceValue).toEqual(expectedBalanceValue);
  });
});
describe('snashopts', () => {
  it('App snapshot', () => {
    const tree = shallow(<App />);
    expect(toJson(tree)).toMatchSnapshot();
  });
  it('Account snapshot', () => {
    const accountValanceTree = shallow(<AccountBalance accounts={useBalance} />);
    expect(toJson(accountValanceTree)).toMatchSnapshot();
  });
  it('Notification snapshot', () => {
    const notificationTree = shallow(<Notification balance={useBalance.balance} />);
    expect(toJson(notificationTree)).toMatchSnapshot();
  });
});
