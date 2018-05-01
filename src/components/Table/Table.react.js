// @flow

import * as React from "react";
import cn from "classnames";
import TableHeader from "./TableHeader.react";
import TableBody from "./TableBody.react";
import TableRow from "./TableRow.react";
import TableCol from "./TableCol.react";
import TableColHeader from "./TableColHeader.react";

type Props = {|
  +children?: React.Node,
  +className?: string,
  +cards?: boolean,
  +striped?: boolean,
  +responsive?: boolean,
  +highlightRowOnHover?: boolean,
  +hasOutline?: boolean,
  +verticalAlign?: "center",
  +headerItems?: Array<{ +content?: React.Node, className: string }>,
|};

function Table({
  className,
  children,
  cards,
  striped,
  responsive,
  highlightRowOnHover,
  hasOutline,
  verticalAlign,
  ...props
}: Props): React.Node {
  const classes = cn(
    "table",
    {
      "card-table": cards,
      "table-striped": striped,
      "table-hover": highlightRowOnHover,
      "table-outline": hasOutline,
      "table-vcenter": verticalAlign === "center",
    },
    className
  );

  const header = props.headerItems && (
    <Table.Header>
      <Table.Row>
        {props.headerItems.map((item, i) => (
          <Table.ColHeader key={i} className={item.className}>
            {item.content}
          </Table.ColHeader>
        ))}
      </Table.Row>
    </Table.Header>
  );

  const table = (
    <table className={classes} {...props}>
      {header}
      {children}
    </table>
  );

  return !responsive ? table : <div className="table-responsive">{table}</div>;
}

Table.defaultProps = {
  cards: false,
  striped: false,
  responsive: false,
};

Table.Header = TableHeader;
Table.Body = TableBody;
Table.Row = TableRow;
Table.Col = TableCol;
Table.ColHeader = TableColHeader;

export default Table;
