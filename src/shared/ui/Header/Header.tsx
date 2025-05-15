import React from "react";
import { HeaderProps } from "../../types";
import S from "./header.module.scss";
import Link from "next/link";

export default function Header({ prev, next }: HeaderProps) {
  return (
    <div className={S.container}>
      {prev && (
        <Link href={prev} className={S.prev}>
          이전
        </Link>
      )}
      {!prev && <div />}
      <Link href={next} className={S.next}>
        다음
      </Link>
    </div>
  );
}
