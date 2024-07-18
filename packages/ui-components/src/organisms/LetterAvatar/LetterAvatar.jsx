import React, { Component } from 'react';
import styled from 'styled-components';

// export interface LetterAvatarProps {
//   text?: string;
//   collapsed?: boolean;
//   onClick?: (e: any) => void;
//   style?: React.CSSProperties;
//   img?: string;
// }

const LetterText = styled(Text)`
  color: ${({ theme }) => theme.BG_GREY};
`;

const Wrapper = styled.div`
  width: 100%;
  height: ${({ collapsed }) => (collapsed ? '60px' : '148px')};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-bottom: 1px solid ${({ theme }) => theme.CTA_COLOR_HOVER};
`;
Wrapper.displayName = 'Wrapper';

const StyledLetterAvatar = styled.div`
  width: 100px;
  height: 100px;
  border-radius: 64px;
  font-size: 30px;
  align-items: center;
  justify-content: center;
  display: flex;
  background-color: gray;
  border: 1px solid ${({ theme }) => theme.CTA_COLOR_HOVER};
  cursor: ${({ onClick }) => (onClick ? 'pointer' : 'auto')};
`;
StyledLetterAvatar.displayName = 'StyledLetterAvatar';

const StyledAvatar = styled.img`
  width: ${({ collapsed }) => (collapsed ? '34px' : '96px')};
  height: ${({ collapsed }) => (collapsed ? '34px' : '96px')};
  border-radius: 64px;
  border: 1px solid ${({ theme }) => theme.CTA_COLOR_HOVER};
  cursor: ${({ onClick }) => (onClick ? 'pointer' : 'auto')};
`;
StyledAvatar.displayName = 'Avatar';

export class LetterAvatar extends Component {
  static defaultProps = { text: null };

  constructor(props) {
    super(props);
    this.state = { text: props.text };
  }

  componentDidUpdate(prevProps) {
    if (prevProps.text !== this.props.text) {
      this.setState({ text: this.props.text });
    }
  }

  render() {
    const { text, img, onClick, collapsed } = this.props;
    return (
      <Wrapper collapsed={collapsed}>
        {text ? (
          <StyledLetterAvatar onClick={onClick}>
            <LetterText style={{ fontSize: '40px' }}>{text}</LetterText>
          </StyledLetterAvatar>
        ) : (
          <StyledAvatar src={img} onClick={onClick} collapsed={collapsed} />
        )}
      </Wrapper>
    );
  }
}
