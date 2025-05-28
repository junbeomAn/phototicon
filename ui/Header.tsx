import React from "react";
import { HeaderProps } from "../../types";
import S from "./header.module.scss";
import Link from "next/link";
import cn from "classnames";

export default function Header({ prev, next, isNextDisabled }: HeaderProps) {
  return (
    <div className={S.container}>
      {prev && (
        <Link href={prev} className={S.prev}>
          이전
        </Link>
      )}
      {/* placeholder */}
      {!prev && <div />}
      <Link
        href={next}
        className={cn(S.next, { [S.disabled]: isNextDisabled })}
        onNavigate={(e) => {
          if (isNextDisabled) e.preventDefault();
        }}
      >
        다음
      </Link>
    </div>
  );
}
