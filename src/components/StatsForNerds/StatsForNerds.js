import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { css } from 'emotion';
import Toast from 'react-bootstrap/Toast';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';

const StatsForNerds = ({ items }) => {
  const [show, setShow] = useState(false);
  return (
    <div
      className={css`
        position: fixed;
        left: 0;
        top: 0;
        .toast-header,
        .toast-body {
          background-color: #343a40;
        }
        table {
          margin: 0;
        }
      `}>
      <Button variant="dark" size="sm" onClick={() => setShow(!show)}>
        Stats For Nerds
      </Button>
      <Toast
        variant="dark"
        show={show}
        className={css`
          ${!show &&
            css`
              display: none;
            `}
        `}>
        <Table striped bordered hover variant="dark">
          <thead>
            <tr>
              <th>VA (Random Variable)</th>
              <th>Value</th>
            </tr>
          </thead>
          <tbody>
            {items.map(({ key, value }) => (
              <tr key={key}>
                <td>{key}</td>
                <td>{value}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Toast>
    </div>
  );
};

StatsForNerds.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string.isRequired,
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    })
  ).isRequired,
};

StatsForNerds.defaultProps = {
  items: [],
};

export default StatsForNerds;
