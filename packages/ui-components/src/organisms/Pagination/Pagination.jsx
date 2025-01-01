import React from 'react';
import styled from 'styled-components';

import { Text, LoadingIndicator } from '../../atoms';
import { ChevLeft, ChevRight } from '../../atoms/icons';
import { Dropdown } from '../Dropdown';

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  user-select: none;
`;

const CircleButton = styled.div`
  color: ${({ theme, active }) => (active ? theme.WHITE : theme.BLACK)};
  fill: ${({ theme }) => theme.BLACK};
  background-color: ${({ active, theme }) =>
    active ? theme.CTA_COLOR : 'rgba(0,0,0,0)'};

  cursor: pointer;
  box-sizing: border-box;

  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 2px;
  padding: 2px;
  border: 1px solid rgba(0, 0, 0, 0.2);

  width: 32px;
  height: 32px;

  transition: all 0.1s ease-in-out;

  &:hover {
    color: ${({ theme }) => theme.WHITE};
    fill: ${({ theme }) => theme.WHITE};
    background-color: ${({ theme }) => theme.CTA_COLOR};
  }
  &:hover > * {
    color: ${({ theme }) => theme.WHITE};
  }
  & > * {
    transition: all 0.1s ease-in-out;
    color: ${({ theme, active }) => (active ? theme.WHITE : theme.BLACK)};
  }
`;

const range = (low, high) => {
  const result = [];
  for (let i = low; i <= high; i++) {
    result.push(i);
  }
  return result;
};

export class Pagination extends React.Component {
  static defaultProps = { noRecordsText: 'No records to display.' };

  constructor(props) {
    super(props);

    ['increment', 'decrement'].forEach((k) => (this[k] = this[k].bind(this)));

    this.state = { page: 1 };
  }

  /**
   * There's some serious stuff going on here.
   * Don't touch this under any circumstances. ;)
   *
   * The idea is that we always want to show up to 9 options to keep the < and > buttons in one position.
   * Therefore, if there are less than or equal to 9 pages, we just show all 9.
   *
   * Otherwise we want to be able to jump to the first and last page at any time,
   * and skip atleast 2 pages for quicker navigation. This ideally looks like:
   * 1 … 5 6 7 8 9 … 30
   * [----9 chars-----]
   *
   * You get it?
   */
  getClickablePages() {
    const { pageNumber, totalPages } = this.props;
    const s = (s) => s.toString();

    if (totalPages <= 9) {
      return range(1, totalPages).map(s);
    }

    if (pageNumber <= 5) {
      return [...range(1, 7), '...', totalPages].map(s);
    }

    if (pageNumber > totalPages - 5) {
      return ['1', '...', ...range(totalPages - 6, totalPages)].map(s);
    }

    const lower = Math.max(pageNumber - 2, 1);
    const upper = Math.min(pageNumber + 2, totalPages);

    return [1, '...', ...range(lower, upper), '...', totalPages].map(s);
  }

  increment() {
    this.props.onChange(this.props.pageNumber + 1);
  }

  decrement() {
    this.props.onChange(this.props.pageNumber - 1);
  }

  render() {
    const clickablePages = this.getClickablePages();

    const hasPrevious = this.props.pageNumber !== 1;
    const hasNext = this.props.pageNumber !== this.props.totalPages;

    return (
      <Container
        style={{
          width: '100%',
          display: 'unset',
          ...this.props.style,
        }}
      >
        {this.props.loading && this.props.totalEntries === 0 && (
          <LoadingIndicator name="line-scale" />
        )}
        {this.props.totalEntries === 0 && !this.props.loading && (
          <Container style={{ marginBottom: '16px' }}>
            <Text>{this.props.noRecordsText}</Text>
          </Container>
        )}
        {this.props.totalEntries !== 0 && (
          <Container style={this.props.style}>
            <CircleButton
              disabled={!hasPrevious}
              onClick={hasPrevious ? this.decrement : undefined}
            >
              <ChevLeft />
            </CircleButton>

            {clickablePages.map((page) => (
              <CircleButton
                active={page === this.props.pageNumber.toString()}
                key={page + Math.random().toString()}
                onClick={
                  page === '...'
                    ? this.props.onRequestPageEntry
                    : () => this.props.onChange(Number(page))
                }
              >
                <Text>{page}</Text>
              </CircleButton>
            ))}

            <CircleButton
              disabled={!hasNext}
              onClick={hasNext ? this.increment : undefined}
            >
              <ChevRight />
            </CircleButton>

            {this.props.pageSizes && this.props.pageSizes.length ? (
              <Dropdown
                items={this.props.pageSizes.map((s) => ({
                  text: `${s}`,
                  value: s,
                }))}
                value={Number(this.props.pageSize)}
                onChange={(ev) =>
                  this.props.onChange(
                    Number(this.props.pageNumber),
                    ev.target.value
                  )
                }
                style={{ width: 'auto', minWidth: '100px' }}
              />
            ) : (
              <div />
            )}
          </Container>
        )}
      </Container>
    );
  }
}
