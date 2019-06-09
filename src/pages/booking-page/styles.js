import styled from 'styled-components';

export const BookingPage = styled.div`
  font-size: 1.6rem;
`;

export const BookContainer = styled.div`
  width: 120rem;
  margin: 0 auto;
  border: 1px solid black;
  border-radius: 4px;
`;

export const DatePickerContainer = styled.div``;

export const Label = styled.div`
  margin: 2rem 2rem 0 2rem;
  border-bottom: .1rem solid gray;
`;

export const Select = styled.select`
  width: 20rem;
  height: 3.5rem;
  background: white;
  color: gray;
  padding-left: .5rem;
  font-size: 1.4rem;
  border: none;
  margin-left: 1rem;

  option {
    color: black;
    background: white;
    display: flex;
    white-space: pre;
    min-height: 20px;
    padding: 0px 2px 1px;
  }
`;

export const SelectWrapper = styled.div`
  width: 30rem;
`;

export const SelectContainer = styled.div`
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-around;
  align-items: center;
  width: 40rem;
  margin: 2rem 0 0 0;
`;

export const Button = styled.button`
  padding: 1rem 4rem;
  margin: 1rem;
`;
